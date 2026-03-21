// Email service for the beauty academy website

import nodemailer from 'nodemailer';
import { promises as fsPromises } from 'fs';
import { resolve } from 'path';
import type { EmailConfig, FormSubmissionResult } from '../../app/types/api-types';
import { logger } from './logger';

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Creates a nodemailer transporter using the provided configuration
 * @param config Email configuration
 * @returns Nodemailer transporter
 */
function createTransporter(config: EmailConfig) {
  if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
    throw new Error('Nodemailer is not properly initialized');
  }
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // true for 465, false for other ports
    auth: config.auth
  });
}

/**
 * Sends a form submission notification via email
 * @param config Email configuration
 * @param recipientEmail Email address of the recipient
 * @param formData Form data to include in the email
 * @param formType Type of form ('application' or 'enquiry')
 * @param attachments Optional array of file attachments
 * @returns Promise<FormSubmissionResult> indicating success or failure
 */
export async function sendFormNotification(
  config: EmailConfig,
  recipientEmail: string,
  formData: any,
  formType: 'application' | 'enquiry',
  attachments?: { buffer: Buffer; name: string }[]
): Promise<FormSubmissionResult> {
  try {
    let transporter;
    try {
      transporter = createTransporter(config);
    } catch (error: any) {
      logger.error(`Failed to create email transporter for ${recipientEmail}`, {
        error: error.message,
        formType
      });

      return {
        success: false,
        submissionId: '', // Will be set by caller
        emailSent: false,
        driveStored: false,
        errors: [`Email transporter creation failed: ${error.message}`]
      };
    }

    // Create email template based on form type
    const template = await createEmailTemplate(formData, formType);

    // Build email attachments array
    const emailAttachments: any[] = [];
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        emailAttachments.push({
          filename: attachment.name,
          content: attachment.buffer
        });
      }
    }

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Beauty Academy" <${config.auth.user}>`, // sender address
      to: recipientEmail, // list of receivers
      subject: template.subject,
      text: template.text,
      html: template.html,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined
    });

    logger.info(`Email sent successfully to ${recipientEmail}`, {
      messageId: info.messageId,
      formType,
      recipient: recipientEmail,
      attachmentsCount: attachments?.length || 0
    });

    return {
      success: true,
      submissionId: '', // Will be set by caller
      emailSent: true,
      driveStored: false // This will be updated by caller
    };
  } catch (error: any) {
    logger.error(`Failed to send email to ${recipientEmail}`, {
      error: error.message,
      formType,
      recipient: recipientEmail
    });

    return {
      success: false,
      submissionId: '', // Will be set by caller
      emailSent: false,
      driveStored: false,
      errors: [`Email sending failed: ${error.message}`]
    };
  }
}

/**
 * Loads an email template from file and fills in the data
 * @param templateName Name of the template file (without extension)
 * @param data Data to fill into the template
 * @returns Filled template content
 */
async function loadTemplate(templateName: string, data: Record<string, any>): Promise<{ html: string; text: string }> {
  // Define template paths
  const htmlTemplatePath = resolve(process.cwd(), 'server/templates', `${templateName}-html-template.html`);
  const textTemplatePath = resolve(process.cwd(), 'server/templates', `${templateName}-text-template.txt`);

  let htmlContent = '';
  let textContent = '';

  try {
    // Load HTML template
    htmlContent = await fsPromises.readFile(htmlTemplatePath, 'utf8');
    // Replace placeholders in HTML template
    htmlContent = replacePlaceholders(htmlContent, data);
  } catch (error) {
    logger.error(`Failed to load HTML template: ${templateName}`, { error });
    // Fallback to simple HTML
    htmlContent = `<p>Form data: ${JSON.stringify(data)}</p>`;
  }

  try {
    // Load text template
    textContent = await fsPromises.readFile(textTemplatePath, 'utf8');
    // Replace placeholders in text template
    textContent = replacePlaceholders(textContent, data);
  } catch (error) {
    logger.error(`Failed to load text template: ${templateName}`, { error });
    // Fallback to simple text
    textContent = `Form data: ${JSON.stringify(data)}`;
  }

  return { html: htmlContent, text: textContent };
}

/**
 * Replaces placeholders in a template with actual values
 * @param template Template string with placeholders like {{placeholder}}
 * @param data Object with key-value pairs to replace placeholders
 * @returns Template with placeholders replaced
 */
function replacePlaceholders(template: string, data: Record<string, any>): string {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value || 'Not provided');
  }
  return result;
}

/**
 * Creates an email template based on form data and type
 * @param formData The form data to include in the email
 * @param formType Type of form ('application' or 'enquiry')
 * @returns Email template with subject, HTML, and text content
 */
async function createEmailTemplate(formData: any, formType: 'application' | 'enquiry'): Promise<EmailTemplate> {
  let subject = '';
  let templateName = '';

  if (formType === 'application') {
    // Student application form
    subject = 'New Student Application Received';
    templateName = 'application';
  } else {
    // Enquiry form
    subject = 'New Enquiry Received';
    templateName = 'enquiry';
  }

  // Load and fill the appropriate template
  const { html, text } = await loadTemplate(templateName, {
    ...formData,
    submissionDate: new Date().toISOString()
  });

  return { subject, html, text };
}

/**
 * Sends a confirmation email to the form submitter
 * @param config Email configuration
 * @param recipientEmail Email address of the form submitter
 * @param submissionId Unique ID of the submission
 * @param formType Type of form ('application' or 'enquiry')
 * @returns Promise<boolean> indicating success or failure
 */
export async function sendConfirmationEmail(
  config: EmailConfig,
  recipientEmail: string,
  submissionId: string,
  formType: 'application' | 'enquiry'
): Promise<boolean> {
  try {
    let transporter;
    try {
      transporter = createTransporter(config);
    } catch (error: any) {
      logger.error(`Failed to create email transporter for confirmation email to ${recipientEmail}`, {
        error: error.message,
        submissionId,
        formType
      });
      
      return false;
    }

    // Load and fill the confirmation template
    const { html, text } = await loadTemplate('confirmation', {
      formType: formType === 'application' ? 'application' : 'enquiry',
      submissionId,
      submissionDate: new Date().toISOString()
    });
    
    const subject = `Your ${formType === 'application' ? 'Application' : 'Enquiry'} Has Been Received`;

    const info = await transporter.sendMail({
      from: `"Beauty Academy" <${config.auth.user}>`, // sender address
      to: recipientEmail, // recipient
      subject: subject,
      text: text,
      html: html
    });

    logger.info(`Confirmation email sent to ${recipientEmail}`, {
      messageId: info.messageId,
      submissionId,
      formType
    });

    return true;
  } catch (error: any) {
    logger.error(`Failed to send confirmation email to ${recipientEmail}`, {
      error: error.message,
      submissionId,
      formType
    });

    return false;
  }
}