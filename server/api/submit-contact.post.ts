// API route for submitting contact form

import { readMultipartFormData } from 'h3';
import { logger } from '../utils/logger';
import { sendFormNotification, sendConfirmationEmail } from '../utils/email-service';
import { storeFormDataInDrive, storeDocumentInDrive } from '../utils/google-drive';
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
      
      // In development or if reCAPTCHA is not properly configured, we'll allow the submission
      // but log it appropriately
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

    // Process the submission with email and Google Drive integration
    // Get email and Google Drive configurations from runtime config
    const config = useRuntimeConfig();
    
    // Prepare email configuration
    const emailConfig = {
      host: config.smtpHost,
      port: parseInt(config.smtpPort),
      secure: config.smtpSecure === 'true', // true for 465, false for other ports
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      }
    };

    // Prepare Google Drive configuration
    const driveConfig = {
      clientId: config.googleDriveClientId,
      clientSecret: config.googleDriveClientSecret,
      redirectUri: config.googleDriveRedirectUri,
      refreshToken: config.googleDriveRefreshToken
    };

    // Store form data in Google Drive (only if credentials are provided)
    let driveResult = { success: false, driveStored: false };
    if (driveConfig.clientId && driveConfig.clientSecret && driveConfig.redirectUri) {
      try {
        driveResult = await storeFormDataInDrive(
          driveConfig,
          formData,
          'enquiry', // Using 'enquiry' type for contact form
          `contact_submission_${submissionId}.json`
        );
      } catch (error: any) {
        logger.error('Failed to store form data in Google Drive', {
          error: error.message,
          submissionId,
          email: formData.email
        });
        driveResult = { success: false, driveStored: false };
      }
    } else {
      logger.warn('Google Drive credentials not configured, skipping Google Drive storage', {
        submissionId,
        email: formData.email
      });
    }

    // If there's a file attachment, store it in Google Drive (only if credentials are provided)
    let fileStoredInDrive = false;
    if (fileBuffer && fileName && driveConfig.clientId && driveConfig.clientSecret && driveConfig.redirectUri) {
      try {
        const fileId = await storeDocumentInDrive(
          driveConfig,
          fileBuffer,
          `${submissionId}_${fileName}`
        );
        fileStoredInDrive = !!fileId;
      } catch (error: any) {
        logger.error('Failed to store file in Google Drive', {
          error: error.message,
          submissionId,
          fileName
        });
      }
    }

    // Send notification email (only if credentials are provided)
    let emailResult = { success: false, emailSent: false };
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        // Include file attachment in email if present
        const attachments = fileBuffer ? [{ buffer: fileBuffer, name: fileName || 'attachment' }] : undefined;

        emailResult = await sendFormNotification(
          emailConfig,
          config.adminEmail || 'admin@bknbeautyacademy.co.za', // Admin email for notifications
          formData,
          'enquiry', // Using 'enquiry' type for contact form
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
    
    // Send confirmation email to the user (only if credentials are provided)
    let confirmationSent = false;
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        confirmationSent = await sendConfirmationEmail(
          emailConfig,
          formData.email,
          submissionId,
          'enquiry' // Using 'enquiry' type for contact form
        );
      } catch (error: any) {
        logger.error('Failed to send confirmation email', {
          error: error.message,
          submissionId,
          email: formData.email
        });
      }
    }

    // Determine overall success based on email and drive results
    const overallSuccess = emailResult.success || driveResult.success;

    // Log the submission
    logger.info('Contact form submitted successfully', {
      submissionId,
      email: formData.email,
      subject: formData.subject,
      emailSent: emailResult.success,
      driveStored: driveResult.success,
      fileStoredInDrive
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