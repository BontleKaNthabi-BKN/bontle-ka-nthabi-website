// API route for submitting student applications

import { readMultipartFormData } from 'h3';
import { validateStudentApplication } from '../utils/form-validator';
import { isDuplicateSubmission, recordSubmission } from '../utils/duplicate-checker';
import { logger } from '../utils/logger';
import { verifyRecaptcha } from '../utils/recaptcha';
import { storeFormDataInDrive, storeDocumentInDrive } from '../utils/google-drive';
import { sendFormNotification, sendConfirmationEmail } from '../utils/email-service';
import type { SubmitApplicationRequest, SubmitResponse } from '~/app/types/form-types';

interface ApplicationWithFiles extends SubmitApplicationRequest {
  recaptchaToken?: string;
  dateOfBirth?: string;
}

export default defineEventHandler(async (event) => {
  try {
    let formData: ApplicationWithFiles;
    const files: { buffer: Buffer; name: string }[] = [];

    // Check if the request is multipart/form-data (for file uploads)
    const contentType = event.node.req.headers['content-type'] || '';

    if (contentType.toLowerCase().includes('multipart/form-data')) {
      // Handle multipart form data with file uploads
      const parts = await readMultipartFormData(event);

      const formFields: Record<string, any> = {};

      for (const part of parts) {
        if (part.name && part.data) {
          // Check if this is a file
          if (part.type === 'file' || part.filename) {
            // Handle file attachment
            files.push({
              buffer: Buffer.from(part.data),
              name: part.filename || 'attachment'
            });
          } else {
            // Handle regular form fields
            formFields[part.name] = part.data.toString();
          }
        }
      }

      // Convert form fields to the expected format
      formData = {
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        email: formFields.email,
        phone: formFields.phone || '',
        dateOfBirth: formFields.dateOfBirth || '',
        address: formFields.address || '',
        courseSelection: formFields.courseSelection,
        supportingDocuments: [],
        recaptchaToken: formFields.recaptchaToken
      };

    } else {
      // Handle regular JSON request (no file upload)
      const body = await readBody(event) as ApplicationWithFiles;
      formData = body;
    }

    // Get client IP for duplicate checking
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
    const validationErrors = validateStudentApplication(formData);
    if (validationErrors.length > 0) {
      logger.warn('Application validation failed', {
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
    const isDuplicate = await isDuplicateSubmission(formData.email, clientIP);
    if (isDuplicate) {
      logger.warn('Duplicate application submission detected', {
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
    const submissionId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
          'application',
          `application_submission_${submissionId}.json`
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

    // Store supporting documents in Google Drive (only if credentials are provided)
    const storedFileIds: string[] = [];
    for (const file of files) {
      if (driveConfig.clientId && driveConfig.clientSecret && driveConfig.redirectUri) {
        try {
          const fileId = await storeDocumentInDrive(
            driveConfig,
            file.buffer,
            `${submissionId}_${file.name}`
          );
          if (fileId) {
            storedFileIds.push(fileId);
            logger.info('Document stored in Google Drive', {
              fileId,
              fileName: file.name,
              submissionId
            });
          }
        } catch (error: any) {
          logger.error('Failed to store document in Google Drive', {
            error: error.message,
            fileName: file.name,
            submissionId
          });
        }
      }
    }

    // Send notification email with attachments (only if credentials are provided)
    let emailResult = { success: false, emailSent: false };
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        // Include file information in the form data for the email
        const formDataWithFiles = {
          ...formData,
          attachments: files.map(f => f.name).join(', ') || 'None',
          attachmentCount: files.length
        };

        emailResult = await sendFormNotification(
          emailConfig,
          config.adminEmail || 'admin@bknbeautyacademy.co.za', // Admin email for notifications
          formDataWithFiles,
          'application',
          files // Pass actual file buffers for email attachment
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
          'application'
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
    const overallSuccess = emailResult.success || driveResult.success || storedFileIds.length > 0;

    // Log the submission
    logger.info('Application submitted successfully', {
      submissionId,
      email: formData.email,
      courseSelection: formData.courseSelection,
      filesCount: files.length,
      filesStoredInDrive: storedFileIds.length,
      emailSent: emailResult.success,
      driveStored: driveResult.success
    });

    // Return success response
    return {
      success: overallSuccess,
      submissionId,
      message: 'Application submitted successfully',
      verificationRequired: true
    } satisfies SubmitResponse;
  } catch (error: any) {
    logger.error('Error processing application submission', {
      error: error.message,
      stack: error.stack
    });

    return {
      success: false,
      message: 'An error occurred while processing your application'
    } satisfies SubmitResponse;
  }
});