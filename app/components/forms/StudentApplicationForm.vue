<template>
  <div class="form-container">
    <h2>Student Application Form</h2>
    <form @submit.prevent="submitApplication" enctype="multipart/form-data">
      <div class="form-field">
        <label for="firstName" class="form-label">First Name *</label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          class="form-input"
          required
          maxlength="50"
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-field">
        <label for="lastName" class="form-label">Last Name *</label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          class="form-input"
          required
          maxlength="50"
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-field">
        <label for="email" class="form-label">Email *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="form-input"
          required
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-field">
        <label for="phone" class="form-label">Phone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="form-input"
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-field">
        <label for="dateOfBirth" class="form-label">Date of Birth *</label>
        <input
          id="dateOfBirth"
          v-model="form.dateOfBirth"
          type="date"
          class="form-input"
          required
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-field">
        <label for="address" class="form-label">Address</label>
        <textarea
          id="address"
          v-model="form.address"
          class="form-input"
          rows="3"
          maxlength="200"
          :disabled="isSubmitting"
        ></textarea>
      </div>

      <div class="form-field">
        <label for="courseSelection" class="form-label">Course Selection *</label>
        <select
          id="courseSelection"
          v-model="form.courseSelection"
          class="form-input"
          required
          :disabled="isSubmitting"
        >
          <option value="" disabled>Select a course</option>
          <option value="cosmetology">Cosmetology</option>
          <option value="esthetician">Esthetician</option>
          <option value="manicurist">Manicurist</option>
          <option value="pedicurist">Pedicurist</option>
          <option value="makeup">Makeup Artistry</option>
          <option value="hair-styling">Hair Styling</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-field">
        <label for="supportingDocuments" class="form-label">Supporting Documents</label>
        <FileUpload
          id="supportingDocuments"
          ref="fileUploadRef"
          @files-selected="handleFilesSelected"
          :disabled="isSubmitting"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Max file size: 10MB per file. Accepted formats: PDF, DOC, DOCX, JPG, PNG</p>
      </div>

      <div class="form-field">
        <button type="submit" class="form-button" :disabled="isSubmitting">
          <span v-if="isSubmitting">
            <svg class="animate-spin inline-block h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
          <span v-else>Submit Application</span>
        </button>
      </div>

      <!-- Error messages -->
      <div v-if="errors.length" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4" role="alert">
        <p class="font-bold mb-2">⚠️ Submission Error</p>
        <ul class="list-disc pl-5">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!-- Success message -->
      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4" role="status">
        <p class="font-bold mb-2">✓ Success</p>
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { SubmitApplicationRequest } from '~/types/form-types';
import FileUpload from '~/components/forms/FileUpload.vue';

interface FormData extends SubmitApplicationRequest {
  dateOfBirth: string;
  recaptchaToken?: string;
}

const form = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  courseSelection: '',
  supportingDocuments: []
});

const errors = ref<string[]>([]);
const successMessage = ref<string>('');
const isSubmitting = ref(false);
const fileUploadRef = ref();
const selectedFiles = ref<File[]>([]);

// Handle files selected in the FileUpload component
const handleFilesSelected = (files: File[]) => {
  selectedFiles.value = files;
};

// Function to execute reCAPTCHA
const executeRecaptcha = async (action: string = 'application_form'): Promise<string> => {
  const config = useRuntimeConfig();
  const recaptchaSiteKey = config.public.recaptchaSiteKey;

  if (!recaptchaSiteKey) {
    console.warn('reCAPTCHA site key not configured - using development mode');
    return 'dummy-token-development';
  }

  if (typeof window !== 'undefined') {
    await new Promise((resolve) => {
      const checkRecaptcha = () => {
        if ((window as any).grecaptcha && (window as any).grecaptcha.ready) {
          resolve(true);
        } else {
          setTimeout(checkRecaptcha, 500);
        }
      };
      checkRecaptcha();
    });

    return new Promise((resolve, reject) => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha.execute(recaptchaSiteKey, { action })
          .then(resolve)
          .catch((err: any) => {
            console.error('reCAPTCHA execution failed:', err);
            resolve('dummy-token-development');
          });
      });
    });
  }
  
  return 'dummy-token-development';
};

// Validate form before submission
const validateForm = (): string[] => {
  const validationErrors: string[] = [];
  
  if (!form.firstName || form.firstName.trim().length < 2) {
    validationErrors.push('First name must be at least 2 characters long');
  }
  
  if (!form.lastName || form.lastName.trim().length < 2) {
    validationErrors.push('Last name must be at least 2 characters long');
  }
  
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    validationErrors.push('Please enter a valid email address');
  }
  
  if (!form.dateOfBirth) {
    validationErrors.push('Please select your date of birth');
  } else {
    // Validate age (must be at least 16 years old)
    const birthDate = new Date(form.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 16) {
      validationErrors.push('You must be at least 16 years old to apply');
    }
  }
  
  if (!form.courseSelection) {
    validationErrors.push('Please select a course');
  }
  
  return validationErrors;
};

// Submit the application form
const submitApplication = async () => {
  errors.value = [];
  successMessage.value = '';
  
  // Client-side validation
  const validationErrors = validateForm();
  if (validationErrors.length > 0) {
    errors.value = validationErrors;
    return;
  }
  
  isSubmitting.value = true;

  try {
    const recaptchaToken = await executeRecaptcha('application_form');

    const formDataToSend = new FormData();

    formDataToSend.append('firstName', form.firstName.trim());
    formDataToSend.append('lastName', form.lastName.trim());
    formDataToSend.append('email', form.email.trim());
    formDataToSend.append('phone', form.phone?.trim() || '');
    formDataToSend.append('dateOfBirth', new Date(form.dateOfBirth).toISOString());
    formDataToSend.append('address', form.address?.trim() || '');
    formDataToSend.append('courseSelection', form.courseSelection);
    formDataToSend.append('recaptchaToken', recaptchaToken);

    // Append files if any
    for (const file of selectedFiles.value) {
      formDataToSend.append('attachments', file, file.name);
    }

    const response = await $fetch('/api/submit-application', {
      method: 'POST',
      body: formDataToSend
    });

    if (response.success) {
      // Reset form
      Object.assign(form, {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        courseSelection: '',
        supportingDocuments: []
      });

      // Clear file upload
      if (fileUploadRef.value) {
        fileUploadRef.value.clearFiles();
      }
      selectedFiles.value = [];

      successMessage.value = 'Thank you! Your application has been submitted successfully. We will review it and contact you within 2-3 business days.';
      
      // Auto-hide success message after 15 seconds
      setTimeout(() => {
        successMessage.value = '';
      }, 15000);
    } else {
      if (response.errors && response.errors.length > 0) {
        errors.value = response.errors.map((err: any) => err.message || `${err.field}: ${err.message}`);
      } else {
        errors.value = [response.message || 'An error occurred while submitting the application. Please try again.'];
      }
    }
  } catch (error: any) {
    console.error('Submission error:', error);
    
    // Handle different error types
    if (error.statusCode === 503) {
      errors.value = ['Service temporarily unavailable. Please try again later.'];
    } else if (error.statusCode === 429) {
      errors.value = ['Too many submissions. Please wait a moment before trying again.'];
    } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
      errors.value = ['Network error. Please check your internet connection and try again.'];
    } else {
      errors.value = [error.message || 'An unexpected error occurred. Please try again later.'];
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.form-container {
  @apply bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md;
}

.form-field {
  @apply mb-4;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed;
}

.form-button {
  @apply w-full bg-primary-green hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
