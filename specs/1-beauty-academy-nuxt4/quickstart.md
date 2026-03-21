# Quickstart Guide: Beauty Academy Nuxt 4 Website with Student Form Submission

## Prerequisites
- Node.js 18+ installed
- Nuxt 4.1.3+ installed
- Google Cloud account with Drive API enabled
- OAuth 2.0 credentials for Google Drive
- SMTP server configuration for email notifications

## Setup Instructions

### 1. Environment Configuration
```bash
# Copy the environment template
cp .env.example .env

# Update the following variables in .env:
GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret
GOOGLE_DRIVE_REDIRECT_URI=your_redirect_uri
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=sender_email_address
NUXT_BASE_URL=your_base_url
```

### 2. Install Dependencies
```bash
# Navigate to the project root
cd beauty-academy-website

# Install dependencies
npm install
```

### 3. Initialize Google Drive Integration
```bash
# Run the setup script to configure Google Drive OAuth
npm run setup:google-drive
```

### 4. Run the Development Server
```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

## Key Components

### Frontend Components
- `StudentApplicationForm.vue` - Main application form component
- `EnquiryForm.vue` - General enquiry form component
- `FileUpload.vue` - File upload functionality
- `FormConfirmation.vue` - Submission confirmation display

### Server API Routes
- `submit-application.post.ts` - Handles student application submissions
- `submit-enquiry.post.ts` - Handles enquiry form submissions
- `verify-email.post.ts` - Handles email verification

### Server Utilities
- `google-drive.ts` - Manages Google Drive integration
- `email-service.ts` - Handles email notifications
- `form-validator.ts` - Validates form submissions
- `duplicate-checker.ts` - Prevents duplicate submissions

## Testing the Feature

### Unit Tests
```bash
# Run all unit tests
npm run test:unit

# Run specific form validation tests
npm run test:unit -- --filter="form-validation"
```

### Integration Tests
```bash
# Run form submission integration tests
npm run test:integration -- --filter="form-submission"
```

### End-to-End Tests
```bash
# Run e2e tests for the form submission flow
npm run test:e2e
```

## API Endpoints

### Submit an Application
```bash
curl -X POST http://localhost:3000/api/submit-application \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "courseSelection": "Cosmetology 101"
  }'
```

### Submit an Enquiry
```bash
curl -X POST http://localhost:3000/api/submit-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com",
    "enquiryType": "course_info",
    "message": "I would like information about your cosmetology program."
  }'
```

### Upload a File
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@document.pdf" \
  -F "fileName=document.pdf" \
  -F "formId=temp-form-id"
```

## Troubleshooting

### Common Issues
1. **Google Drive API errors**: Verify OAuth credentials in .env file
2. **Email not sending**: Check SMTP configuration in .env file
3. **File upload fails**: Ensure file size is under 10MB limit
4. **Form validation errors**: Check that all required fields are filled correctly

### Logs
- Server logs: Check the terminal where `npm run dev` is running
- Error logs: Located in `/logs/error.log`
- Access logs: Located in `/logs/access.log`

## Deployment

### Build for Production
```bash
# Build the application for production
npm run build
```

### Start Production Server
```bash
# Start the production server
npm start
```

## Next Steps
1. Customize form fields based on specific course requirements
2. Add additional validation rules as needed
3. Configure automated email templates
4. Set up monitoring for form submission success rates