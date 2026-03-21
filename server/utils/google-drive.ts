// Google Drive service for the beauty academy website

import { google, drive_v3 } from 'googleapis';
import type { GoogleDriveConfig, FormSubmissionResult } from '../../app/types/api-types';
import { logger } from './logger';

/**
 * Authenticates with Google Drive using OAuth2
 * @param config Google Drive configuration
 * @returns Authenticated Google Drive client
 */
async function authenticateGoogleDrive(config: GoogleDriveConfig): Promise<drive_v3.Drive> {
  // Check if all required config values are present
  if (!config.clientId || !config.clientSecret || !config.redirectUri) {
    console.error('Missing required Google Drive configuration values');
    throw new Error('Missing required Google Drive configuration values');
  }

  const auth = new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirectUri
  );

  if (config.refreshToken) {
    auth.setCredentials({ refresh_token: config.refreshToken });
  } else {
    console.warn('No refresh token provided for Google Drive. This may cause authentication issues.');
  }

  return google.drive({ version: 'v3', auth });
}

/**
 * Stores form data in Google Drive
 * @param config Google Drive configuration
 * @param formData Form data to store
 * @param formType Type of form ('application' or 'enquiry')
 * @param fileName Name for the file in Google Drive
 * @returns Promise<FormSubmissionResult> indicating success or failure
 */
export async function storeFormDataInDrive(
  config: GoogleDriveConfig,
  formData: any,
  formType: 'application' | 'enquiry',
  fileName: string
): Promise<FormSubmissionResult> {
  try {
    const drive = await authenticateGoogleDrive(config);

    // Convert form data to a string representation
    const fileContent = JSON.stringify({
      formType,
      submittedAt: new Date().toISOString(),
      data: formData
    }, null, 2);

    // Create a temporary file to upload
    const fileMetadata = {
      name: fileName,
      parents: ['root'] // Store in root folder, in practice you'd want a specific folder
    };

    const media = {
      mimeType: 'application/json',
      body: fileContent
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    });

    logger.info(`Form data stored in Google Drive`, {
      fileId: response.data.id,
      fileName,
      formType,
      webViewLink: response.data.webViewLink
    });

    return {
      success: true,
      submissionId: '', // Will be set by caller
      emailSent: false, // This will be updated by caller
      driveStored: true,
      errors: undefined
    };
  } catch (error: any) {
    logger.error(`Failed to store form data in Google Drive`, {
      error: error.message,
      formType,
      fileName
    });

    return {
      success: false,
      submissionId: '', // Will be set by caller
      emailSent: false,
      driveStored: false,
      errors: [`Google Drive storage failed: ${error.message}`]
    };
  }
}

/**
 * Stores supporting documents in Google Drive
 * @param config Google Drive configuration
 * @param fileBuffer Buffer containing the file data
 * @param fileName Name for the file in Google Drive
 * @param parentId Optional parent folder ID
 * @returns Promise<string> with the file ID or null if failed
 */
export async function storeDocumentInDrive(
  config: GoogleDriveConfig,
  fileBuffer: Buffer,
  fileName: string,
  parentId?: string
): Promise<string | null> {
  try {
    const drive = await authenticateGoogleDrive(config);

    const fileMetadata = {
      name: fileName,
      parents: parentId ? [parentId] : ['root']
    };

    const media = {
      mimeType: getMimeType(fileName),
      body: fileBuffer
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    });

    logger.info(`Document stored in Google Drive`, {
      fileId: response.data.id,
      fileName,
      webViewLink: response.data.webViewLink
    });

    return response.data.id;
  } catch (error: any) {
    logger.error(`Failed to store document in Google Drive`, {
      error: error.message,
      fileName
    });

    return null;
  }
}

/**
 * Gets the MIME type based on file extension
 * @param fileName Name of the file
 * @returns MIME type string
 */
function getMimeType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'txt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
}

/**
 * Creates a folder in Google Drive
 * @param config Google Drive configuration
 * @param folderName Name of the folder to create
 * @param parentId Optional parent folder ID
 * @returns Promise<string> with the folder ID or null if failed
 */
export async function createFolderInDrive(
  config: GoogleDriveConfig,
  folderName: string,
  parentId?: string
): Promise<string | null> {
  try {
    const drive = await authenticateGoogleDrive(config);

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : ['root']
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id'
    });

    logger.info(`Folder created in Google Drive`, {
      folderId: response.data.id,
      folderName,
      parentId
    });

    return response.data.id;
  } catch (error: any) {
    logger.error(`Failed to create folder in Google Drive`, {
      error: error.message,
      folderName,
      parentId
    });

    return null;
  }
}