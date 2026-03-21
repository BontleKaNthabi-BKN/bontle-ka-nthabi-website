# Implementation Plan: Beauty Academy Nuxt 4 Website with Student Form Submission

**Branch**: `1-beauty-academy-nuxt4` | **Date**: 2026-02-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/1-beauty-academy-nuxt4/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a Nuxt 4 website for the beauty academy that allows students to submit application forms and general enquiries. The system will validate inputs, send notifications via email, and store submissions in Google Drive using OAuth 2.0 authentication. This feature directly supports the business goals of achieving 10 student applications and 50 enquiries per week.

## Technical Context

**Language/Version**: TypeScript 5.0+ (following Nuxt.js ecosystem standards)
**Primary Dependencies**: Nuxt 4.1.3, Vue 3.5+, Nitro (server engine), Google Drive API client, nodemailer for email
**Storage**: Google Drive API for file storage, temporary server-side storage for processing
**Testing**: Vitest for unit tests, Playwright for end-to-end tests, custom integration tests for form submission workflows
**Target Platform**: Web application (responsive, mobile-first design)
**Project Type**: Web application (Nuxt 4 framework with Vue 3)
**Performance Goals**: Form submission process completes within 5 minutes (timeout threshold), 95% success rate for submissions
**Constraints**: 10MB file size limit per attachment, 30-day retention period for submissions, email verification required for all submissions
**Scale/Scope**: Handle up to 100 form submissions per day, support multiple concurrent users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*Note: Constitution file has been created at `.specify/memory/constitution.md` with the following principles:*
*- User-Centric Design*
*- Lead Generation Focus* 
*- Mobile-First Responsive Design*
*- Accessibility & Performance*
*- Content Accuracy & Brand Alignment*

## Project Structure

### Documentation (this feature)

```text
specs/1-beauty-academy-nuxt4/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
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
│       ├── Navigation.vue
│       └── Footer.vue
├── pages/
│   ├── index.vue
│   ├── about.vue
│   ├── services.vue
│   ├── gallery.vue
│   ├── contact.vue
│   ├── application.vue
│   └── enquiry.vue
├── server/
│   ├── api/
│   │   ├── submit-application.post.ts
│   │   ├── submit-enquiry.post.ts
│   │   └── verify-email.post.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── utils/
│   │   ├── google-drive.ts
│   │   ├── email-service.ts
│   │   ├── form-validator.ts
│   │   └── duplicate-checker.ts
│   └── middleware/
│       └── auth.ts
├── types/
│   ├── form-types.ts
│   └── api-types.ts
└── composables/
    └── useForms.ts
```

**Structure Decision**: Nuxt 4 project structure following the recommended conventions with server API routes for form processing, components for UI elements, and pages for navigation. The server directory handles form submission, Google Drive integration, and email notifications.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Separate server/api layer | Security and separation of concerns for handling sensitive Google Drive credentials | Combining into single project would expose backend credentials to frontend |
