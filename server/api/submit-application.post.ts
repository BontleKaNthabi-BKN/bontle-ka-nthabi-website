// API route for submitting student applications

import { validateStudentApplication } from '../utils/form-validator';
import { isDuplicateSubmission, recordSubmission } from '../utils/duplicate-checker';
import { logger } from '../utils/logger';
import { verifyRecaptcha } from '../utils/recaptcha';
import type { SubmitApplicationRequest, SubmitResponse } from '~/app/types/form-types';

export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event) as SubmitApplicationRequest;
    
    // Get client IP for duplicate checking
    const clientIP = getRequestIP(event) || 'unknown';
    
    // Validate request body
    if (!body) {
      return {
        success: false,
        message: 'Request body is required',
        errors: [{ field: 'body', message: 'Request body is required' }]
      } satisfies SubmitResponse;
    }

    // Verify reCAPTCHA token
    if (!body.recaptchaToken) {
      logger.warn('reCAPTCHA token is missing', {
        email: body.email
      });
      
      // In development or if reCAPTCHA is not properly configured, we'll allow the submission
      // but log it appropriately
      const config = useRuntimeConfig();
      if (!config.public.recaptchaSiteKey || process.env.NODE_ENV !== 'production') {
        logger.info('Allowing submission without reCAPTCHA in development mode', {
          email: body.email
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
        const isRecaptchaValid = await verifyRecaptcha(body.recaptchaToken);
        if (!isRecaptchaValid) {
          logger.warn('reCAPTCHA verification failed', {
            email: body.email
          });

          return {
            success: false,
            message: 'reCAPTCHA verification failed',
            errors: [{ field: 'recaptcha', message: 'reCAPTCHA verification failed' }]
          } satisfies SubmitResponse;
        }
      } catch (error: any) {
        logger.error('Error during reCAPTCHA verification', {
          email: body.email,
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
    const validationErrors = validateStudentApplication(body);
    if (validationErrors.length > 0) {
      logger.warn('Application validation failed', {
        errors: validationErrors,
        email: body.email
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
    const isDuplicate = await isDuplicateSubmission(body.email, clientIP);
    if (isDuplicate) {
      logger.warn('Duplicate application submission detected', {
        email: body.email,
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
    await recordSubmission(submissionId, body.email, clientIP);

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
          body,
          'application',
          `application_submission_${submissionId}.json`
        );
      } catch (error: any) {
        logger.error('Failed to store form data in Google Drive', {
          error: error.message,
          submissionId,
          email: body.email
        });
        driveResult = { success: false, driveStored: false };
      }
    } else {
      logger.warn('Google Drive credentials not configured, skipping Google Drive storage', {
        submissionId,
        email: body.email
      });
    }

    // Send notification email (only if credentials are provided)
    let emailResult = { success: false, emailSent: false };
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        emailResult = await sendFormNotification(
          emailConfig,
          config.adminEmail || 'admin@bknbeautyacademy.co.za', // Admin email for notifications
          body,
          'application'
        );
      } catch (error: any) {
        logger.error('Failed to send notification email', {
          error: error.message,
          submissionId,
          email: body.email
        });
        emailResult = { success: false, emailSent: false };
      }
    } else {
      logger.warn('Email credentials not configured, skipping email notification', {
        submissionId,
        email: body.email
      });
    }
    
    // Send confirmation email to the user (only if credentials are provided)
    let confirmationSent = false;
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        confirmationSent = await sendConfirmationEmail(
          emailConfig,
          body.email,
          submissionId,
          'application'
        );
      } catch (error: any) {
        logger.error('Failed to send confirmation email', {
          error: error.message,
          submissionId,
          email: body.email
        });
      }
    }

    // Determine overall success based on email and drive results
    const overallSuccess = emailResult.success || driveResult.success;

    // Log the submission
    logger.info('Application submitted successfully', {
      submissionId,
      email: body.email,
      courseSelection: body.courseSelection,
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