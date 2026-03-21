// API type definitions for the beauty academy website

export interface GoogleDriveConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken?: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface FormSubmissionResult {
  success: boolean;
  submissionId: string;
  emailSent: boolean;
  driveStored: boolean;
  errors?: string[];
}