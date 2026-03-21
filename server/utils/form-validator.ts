// Form validation utility for the beauty academy website

import type { SubmitApplicationRequest, SubmitEnquiryRequest } from '../../app/types/form-types';

export interface ContactFormRequest {
  fullName: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
}

/**
 * Validates student application form data
 * @param data The application form data to validate
 * @returns An array of validation errors, or empty array if valid
 */
export function validateStudentApplication(data: SubmitApplicationRequest): string[] {
  const errors: string[] = [];

  // Validate required fields
  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.push('First name is required');
  } else if (data.firstName.length > 50) {
    errors.push('First name must be 50 characters or less');
  }

  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.push('Last name is required');
  } else if (data.lastName.length > 50) {
    errors.push('Last name must be 50 characters or less');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.courseSelection || data.courseSelection.trim().length === 0) {
    errors.push('Course selection is required');
  }

  // Validate date of birth
  if (!data.dateOfBirth) {
    errors.push('Date of birth is required');
  } else {
    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob.getTime())) {
      errors.push('Date of birth format is invalid');
    } else {
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18 || age > 100) {
        errors.push('Applicant must be between 18 and 100 years old');
      }
    }
  }

  // Validate phone if provided
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Phone number format is invalid');
  }

  // Validate address length if provided
  if (data.address && data.address.length > 200) {
    errors.push('Address must be 200 characters or less');
  }

  // Validate supporting documents if provided
  if (data.supportingDocuments) {
    for (const doc of data.supportingDocuments) {
      if (!isValidDocumentId(doc)) {
        errors.push(`Invalid document ID: ${doc}`);
      }
    }
  }

  return errors;
}

/**
 * Validates enquiry form data
 * @param data The enquiry form data to validate
 * @returns An array of validation errors, or empty array if valid
 */
export function validateEnquiry(data: SubmitEnquiryRequest): string[] {
  const errors: string[] = [];

  // Validate required fields
  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.push('Full name is required');
  } else if (data.fullName.length > 100) {
    errors.push('Full name must be 100 characters or less');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.enquiryType || !isValidEnquiryType(data.enquiryType)) {
    errors.push('Valid enquiry type is required');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.length > 1000) {
    errors.push('Message must be 1000 characters or less');
  }

  // Validate phone if provided
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Phone number format is invalid');
  }

  return errors;
}

/**
 * Checks if email format is valid
 * @param email The email to validate
 * @returns True if valid, false otherwise
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if phone number format is valid
 * @param phone The phone number to validate
 * @returns True if valid, false otherwise
 */
function isValidPhone(phone: string): boolean {
  // Simple validation for international format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Checks if document ID is valid
 * @param docId The document ID to validate
 * @returns True if valid, false otherwise
 */
function isValidDocumentId(docId: string): boolean {
  // Simple validation - in reality this would check against stored document IDs
  return typeof docId === 'string' && docId.length > 0;
}

/**
 * Validates contact form data
 * @param data The contact form data to validate
 * @returns An array of validation errors, or empty array if valid
 */
export function validateContact(data: ContactFormRequest): string[] {
  const errors: string[] = [];

  // Validate required fields
  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.push('Full name is required');
  } else if (data.fullName.length > 100) {
    errors.push('Full name must be 100 characters or less');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  } else if (data.subject.length > 200) {
    errors.push('Subject must be 200 characters or less');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.length > 1000) {
    errors.push('Message must be 1000 characters or less');
  }

  // Validate phone if provided
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Phone number format is invalid');
  }

  return errors;
}

/**
 * Checks if enquiry type is valid
 * @param type The enquiry type to validate
 * @returns True if valid, false otherwise
 */
function isValidEnquiryType(type: string): boolean {
  const validTypes = ['course_info', 'admission', 'schedule', 'other'];
  return validTypes.includes(type);
}