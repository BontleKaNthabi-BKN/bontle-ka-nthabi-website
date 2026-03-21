# API Contract: Form Submission Service

## POST /api/submit-application
Submit a new student application form

### Request
```json
{
  "firstName": "string (required, max 50 chars)",
  "lastName": "string (required, max 50 chars)",
  "email": "string (required, valid email format)",
  "phone": "string (optional, validated format)",
  "dateOfBirth": "Date (required, valid date)",
  "address": "string (optional, max 200 chars)",
  "courseSelection": "string (required, from predefined list)",
  "supportingDocuments": ["file_id1", "file_id2"] (optional, file IDs from upload endpoint)
}
```

### Response (Success)
```json
{
  "success": true,
  "submissionId": "string",
  "message": "Application submitted successfully",
  "verificationRequired": true
}
```

### Response (Validation Error)
```json
{
  "success": false,
  "errors": [
    {
      "field": "string",
      "message": "validation error message"
    }
  ]
}
```

### Response (Processing Error)
```json
{
  "success": false,
  "error": "Processing failed, please try again"
}
```

### Headers
- Content-Type: application/json

## POST /api/submit-enquiry
Submit a new enquiry form

### Request
```json
{
  "fullName": "string (required, max 100 chars)",
  "email": "string (required, valid email format)",
  "phone": "string (optional, validated format)",
  "enquiryType": "string (required, 'course_info'|'admission'|'schedule'|'other')",
  "message": "string (required, max 1000 chars)"
}
```

### Response (Success)
```json
{
  "success": true,
  "submissionId": "string",
  "message": "Enquiry submitted successfully",
  "verificationRequired": true
}
```

### Response (Validation Error)
```json
{
  "success": false,
  "errors": [
    {
      "field": "string",
      "message": "validation error message"
    }
  ]
}
```

### Response (Processing Error)
```json
{
  "success": false,
  "error": "Processing failed, please try again"
}
```

### Headers
- Content-Type: application/json

## POST /api/upload
Upload supporting documents for applications

### Request
```json
{
  "file": "binary file data",
  "fileName": "string",
  "formId": "string (temporary form identifier)"
}
```

### Response (Success)
```json
{
  "success": true,
  "fileId": "string",
  "size": "number (bytes)",
  "originalName": "string"
}
```

### Response (Error)
```json
{
  "success": false,
  "error": "File upload failed",
  "details": "specific error message"
}
```

### Headers
- Content-Type: multipart/form-data

## POST /api/verify-email
Verify an email address for form submission

### Request
```json
{
  "email": "string (valid email)",
  "verificationCode": "string"
}
```

### Response
```json
{
  "success": true,
  "verified": true,
  "message": "Email verified successfully"
}
```

## GET /api/submission-status/{submissionId}
Check the status of a form submission

### Response
```json
{
  "submissionId": "string",
  "status": "pending|processing|completed|failed",
  "emailSent": "boolean",
  "driveStored": "boolean",
  "progress": "number (percentage)",
  "estimatedCompletion": "ISO date string (if processing)"
}
```