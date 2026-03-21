# Beauty Academy Nuxt 4 Website

This is a Nuxt 4 website for the Beauty Academy that allows students to submit application forms and general enquiries. The system validates inputs, sends notifications via email, and stores submissions in Google Drive using OAuth 2.0 authentication.

## Features

- Student application form with file upload capability
- General enquiry form
- Form validation and duplicate detection
- Email notifications
- Google Drive integration for storing submissions
- Responsive design for mobile and desktop

## Tech Stack

- Nuxt 4.1.3
- Vue 3.5+
- TypeScript 5.0+
- TailwindCSS
- Nitro (server engine)
- Google Drive API
- Nodemailer for email

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create a `.env` file with the following environment variables:
   ```env
   GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id
   GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret
   GOOGLE_DRIVE_REDIRECT_URI=your_redirect_uri
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_SECURE=false  # or true for port 465
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000

## API Endpoints

- `POST /api/submit-application` - Submit a student application
- `POST /api/submit-enquiry` - Submit an enquiry
- `POST /api/verify-email` - Verify an email address
- `GET /api/[submissionId]` - Get submission status
- `POST /api/upload` - Upload supporting documents

## Environment Variables

The application requires the following environment variables to be set:

- `GOOGLE_DRIVE_*` - Google Drive API credentials for OAuth 2.0
- `SMTP_*` - Email server configuration for sending notifications

## Project Structure

```
app/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── forms/
│   │   ├── StudentApplicationForm.vue
│   │   ├── EnquiryForm.vue
│   │   ├── FileUpload.vue
│   │   └── FormConfirmation.vue
│   └── ui/
├── pages/
│   ├── index.vue
│   ├── application.vue
│   └── enquiry.vue
├── server/
│   ├── api/
│   ├── middleware/
│   └── utils/
├── types/
└── composables/
```

## Security

- OAuth 2.0 authentication for Google Drive integration
- Form validation to prevent malicious input
- Duplicate submission detection
- Secure email transmission

## License

This project is proprietary to Beauty Academy.