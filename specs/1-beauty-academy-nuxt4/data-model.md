# Data Model: Beauty Academy Nuxt 4 Website with Student Form Submission

## Entities

### StudentApplication
- **id**: string (unique identifier)
- **firstName**: string (required, max 50 chars)
- **lastName**: string (required, max 50 chars)
- **email**: string (required, valid email format, verified)
- **phone**: string (optional, validated format)
- **dateOfBirth**: Date (required, valid date)
- **address**: string (optional, max 200 chars)
- **courseSelection**: string (required, from predefined list)
- **supportingDocuments**: Array<string> (file paths/URLs to uploaded documents)
- **applicationDate**: Date (automatically set on creation)
- **status**: enum ['submitted', 'under_review', 'approved', 'rejected'] (default: 'submitted')
- **notes**: string (optional, admin notes)

### EnquiryForm
- **id**: string (unique identifier)
- **fullName**: string (required, max 100 chars)
- **email**: string (required, valid email format, verified)
- **phone**: string (optional, validated format)
- **enquiryType**: string (required, from predefined list: 'course_info', 'admission', 'schedule', 'other')
- **message**: string (required, max 1000 chars)
- **submissionDate**: Date (automatically set on creation)
- **status**: enum ['submitted', 'in_progress', 'resolved'] (default: 'submitted')

### SubmissionRecord
- **id**: string (unique identifier)
- **formType**: enum ['application', 'enquiry'] (required)
- **formId**: string (reference to StudentApplication or EnquiryForm id)
- **timestamp**: Date (automatically set on creation)
- **emailSent**: boolean (default: false)
- **driveStored**: boolean (default: false)
- **driveFilePath**: string (path in Google Drive where data is stored)
- **processingStatus**: enum ['pending', 'processing', 'completed', 'failed'] (default: 'pending')
- **attempts**: number (number of processing attempts, max 3)
- **lastAttempt**: Date (timestamp of last processing attempt)

## Relationships
- One StudentApplication maps to one SubmissionRecord
- One EnquiryForm maps to one SubmissionRecord

## Validation Rules
- All email fields must pass RFC 5322 validation
- Email addresses must be verified before form submission is accepted
- Course selection for StudentApplication must be from a predefined list of valid courses
- File uploads must be under 10MB each as specified in clarifications
- Phone numbers must follow international format (+X XXX XXX XXXX)
- Supporting documents for StudentApplication must be PDF, JPG, or PNG formats

## State Transitions
- **StudentApplication**: submitted → under_review → approved/rejected
- **EnquiryForm**: submitted → in_progress → resolved
- **SubmissionRecord**: pending → processing → completed/failed

## Indexes
- SubmissionRecord.timestamp (for sorting and filtering by date)
- SubmissionRecord.processingStatus (for querying processing queues)
- StudentApplication.email (for duplicate prevention)
- EnquiryForm.email (for duplicate prevention)

## Types (TypeScript)

```typescript
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
```