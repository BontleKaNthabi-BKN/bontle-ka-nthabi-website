// API route for submitting contact form

import { readMultipartFormData } from 'h3';
import { logger } from '../utils/logger';
import { sendFormNotification, sendConfirmationEmail } from '../utils/email-service';
import { storeFormDataInDrive } from '../utils/google-drive';
import { validateContact } from '../utils/form-validator';
import { verifyRecaptcha } from '../utils/recaptcha';
import type { SubmitResponse } from '~/app/types/form-types';

interface ContactRequestBody {
  fullName: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
  recaptchaToken?: string;
}

export default defineEventHandler(async (event) => {
  try {
    let formData: ContactRequestBody;
    let fileBuffer: Buffer | null = null;
    let fileName: string | null = null;

    // Check if the request is multipart/form-data (for file uploads)
    const contentType = event.node.req.headers['content-type'] || '';

    if (contentType.toLowerCase().includes('multipart/form-data')) {
      // Handle multipart form data with file upload
      const parts = await readMultipartFormData(event);

      const formFields: Record<string, any> = {};

      for (const part of parts) {
        if (part.name && part.data) {
          // Check if this is a file by looking at the presence of a filename
          if (part.type === 'file' || part.filename) {
            // Handle file attachment
            fileBuffer = Buffer.from(part.data);
            fileName = part.filename || 'attachment';
          } else {
            // Handle regular form fields
            formFields[part.name] = part.data.toString();
          }
        }
      }

      // Convert form fields to the expected format
      formData = {
        fullName: formFields.fullName,
        email: formFields.email,
        subject: formFields.subject,
        phone: formFields.phone || undefined,
        message: formFields.message
      };

    } else {
      // Handle regular JSON request (no file upload)
      const body = await readBody(event) as ContactRequestBody;
      formData = body;
    }

    // Get client IP for any future duplicate checking
    const clientIP = getRequestIP(event) || 'unknown';

    // Validate request body
    if (!formData) {
      return {
        success: false,
        message: 'Request body is required',
        errors: [{ field: 'body', message: 'Request body is required' }]
      } satisfies SubmitResponse;
    }

    // Verify reCAPTCHA token
    if (!formData.recaptchaToken) {
      logger.warn('reCAPTCHA token is missing', {
        email: formData.email
      });

      const config = useRuntimeConfig();
      if (!config.public.recaptchaSiteKey || process.env.NODE_ENV !== 'production') {
        logger.info('Allowing submission without reCAPTCHA in development mode', {
          email: formData.email
        });
      } else {
        return {
          success: false,
          message: 'reCAPTCHA verification required',
          errors: [{ field: 'recaptcha', message: 'reCAPTCHA verification required' }]
        } satisfies SubmitResponse;
      }
    } else {
      try {
        const isRecaptchaValid = await verifyRecaptcha(formData.recaptchaToken);
        if (!isRecaptchaValid) {
          logger.warn('reCAPTCHA verification failed', {
            email: formData.email
          });

          return {
            success: false,
            message: 'reCAPTCHA verification failed',
            errors: [{ field: 'recaptcha', message: 'reCAPTCHA verification failed' }]
          } satisfies SubmitResponse;
        }
      } catch (error: any) {
        logger.error('Error during reCAPTCHA verification', {
          email: formData.email,
          error: error.message
        });

        return {
          success: false,
          message: 'reCAPTCHA verification error',
          errors: [{ field: 'recaptcha', message: 'reCAPTCHA verification error' }]
        } satisfies SubmitResponse;
      }
    }

    // Validate form data
    const validationErrors = validateContact(formData);
    if (validationErrors.length > 0) {
      logger.warn('Contact form validation failed', {
        errors: validationErrors,
        email: formData.email
      });

      return {
        success: false,
        message: 'Validation failed',
        errors: validationErrors.map(error => ({
          field: 'validation',
          message: error
        }))
      } satisfies SubmitResponse;
    }

    // Check for duplicate submission
    const { isDuplicateSubmission, recordSubmission } = await import('../utils/duplicate-checker');
    const isDuplicate = await isDuplicateSubmission(formData.email, clientIP);
    if (isDuplicate) {
      logger.warn('Duplicate contact submission detected', {
        email: formData.email,
        ip: clientIP
      });

      return {
        success: false,
        message: 'Duplicate submission detected. Please wait before submitting again.',
        errors: [{ field: 'duplicate', message: 'Duplicate submission detected' }]
      } satisfies SubmitResponse;
    }

    // Generate a unique submission ID
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Record the submission to prevent duplicates
    await recordSubmission(submissionId, formData.email, clientIP);

    // Process the submission with email integration
    const config = useRuntimeConfig();

    // Prepare email configuration
    const emailConfig = {
      host: config.smtpHost,
      port: parseInt(config.smtpPort),
      secure: config.smtpSecure === 'true',
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      }
    };

    // Store form data in Google Drive (only if credentials are provided)
    // Note: Google Drive storage is disabled for now
    let driveResult = { success: false, driveStored: false };

    // Send notification email with attachment if present
    let emailResult = { success: false, emailSent: false };
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        // Include file attachment in email if present
        const attachments = fileBuffer ? [{ buffer: fileBuffer, name: fileName || 'attachment' }] : undefined;

        emailResult = await sendFormNotification(
          emailConfig,
          config.adminEmail || 'admin@bknbeautyacademy.co.za',
          formData,
          'enquiry',
          attachments
        );
      } catch (error: any) {
        logger.error('Failed to send notification email', {
          error: error.message,
          submissionId,
          email: formData.email
        });
        emailResult = { success: false, emailSent: false };
      }
    } else {
      logger.warn('Email credentials not configured, skipping email notification', {
        submissionId,
        email: formData.email
      });
    }

    // Send confirmation email to the user
    let confirmationSent = false;
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        confirmationSent = await sendConfirmationEmail(
          emailConfig,
          formData.email,
          submissionId,
          'enquiry',
          formData.fullName
        );
      } catch (error: any) {
        logger.error('Failed to send confirmation email', {
          error: error.message,
          submissionId,
          email: formData.email
        });
      }
    }

    // Determine overall success based on email results
    const overallSuccess = emailResult.success;

    // Log the submission
    logger.info('Contact form submitted successfully', {
      submissionId,
      email: formData.email,
      subject: formData.subject,
      emailSent: emailResult.success,
      hasAttachment: !!fileBuffer
    });

    // Return success response
    return {
      success: overallSuccess,
      submissionId,
      message: 'Contact message submitted successfully',
      verificationRequired: true
    } satisfies SubmitResponse;
  } catch (error: any) {
    logger.error('Error processing contact form submission', {
      error: error.message,
      stack: error.stack
    });

    return {
      success: false,
      message: 'An error occurred while processing your contact message'
    } satisfies SubmitResponse;
  }
});
