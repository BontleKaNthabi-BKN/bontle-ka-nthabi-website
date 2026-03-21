// Form type definitions for the beauty academy website

export interface StudentApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: Date;
  address?: string;
  courseSelection: string;
  supportingDocuments?: string[];
  applicationDate: Date;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  notes?: string;
}

export interface EnquiryForm {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  enquiryType: 'course_info' | 'admission' | 'schedule' | 'other';
  message: string;
  submissionDate: Date;
  status: 'submitted' | 'in_progress' | 'resolved';
}

export interface SubmissionRecord {
  id: string;
  formType: 'application' | 'enquiry';
  formId: string;
  timestamp: Date;
  emailSent: boolean;
  driveStored: boolean;
  driveFilePath?: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  attempts: number;
  lastAttempt?: Date;
}

// API request/response types
export interface SubmitApplicationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string; // ISO date string
  address?: string;
  courseSelection: string;
  supportingDocuments?: string[];
}

export interface SubmitEnquiryRequest {
  fullName: string;
  email: string;
  phone?: string;
  enquiryType: 'course_info' | 'admission' | 'schedule' | 'other';
  message: string;
}

export interface SubmitResponse {
  success: boolean;
  submissionId?: string;
  message: string;
  verificationRequired?: boolean;
  errors?: {
    field: string;
    message: string;
  }[];
}