<template>
  <div class="form-container">
    <h2>General Enquiry Form</h2>
    <form @submit.prevent="submitEnquiry">
      <div class="form-field">
        <label for="fullName" class="form-label">Full Name *</label>
        <input
          id="fullName"
          v-model="form.fullName"
          type="text"
          class="form-input"
          required
          maxlength="100"
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
        <label for="enquiryType" class="form-label">Enquiry Type *</label>
        <select
          id="enquiryType"
          v-model="form.enquiryType"
          class="form-input"
          required
          :disabled="isSubmitting"
        >
          <option value="" disabled>Select an option</option>
          <option value="course_info">Course Information</option>
          <option value="admission">Admission Requirements</option>
          <option value="schedule">Class Schedule</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-field">
        <label for="message" class="form-label">Message *</label>
        <textarea
          id="message"
          v-model="form.message"
          class="form-input"
          rows="5"
          required
          maxlength="1000"
          :disabled="isSubmitting"
        ></textarea>
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
          <span v-else>Submit Enquiry</span>
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
import type { SubmitEnquiryRequest } from '~/types/form-types';

interface FormData extends SubmitEnquiryRequest {
  enquiryType: 'course_info' | 'admission' | 'schedule' | 'other';
  recaptchaToken?: string;
}

const form = reactive<FormData>({
  fullName: '',
  email: '',
  phone: '',
  enquiryType: 'course_info',
  message: ''
});

const errors = ref<string[]>([]);
const successMessage = ref<string>('');
const isSubmitting = ref(false);

// Function to execute reCAPTCHA
const executeRecaptcha = async (action: string = 'enquiry_form'): Promise<string> => {
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
  
  if (!form.fullName || form.fullName.trim().length < 2) {
    validationErrors.push('Full name must be at least 2 characters long');
  }
  
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    validationErrors.push('Please enter a valid email address');
  }
  
  if (!form.enquiryType) {
    validationErrors.push('Please select an enquiry type');
  }
  
  if (!form.message || form.message.trim().length < 10) {
    validationErrors.push('Message must be at least 10 characters long');
  }
  
  return validationErrors;
};

// Submit the enquiry form
const submitEnquiry = async () => {
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
    const recaptchaToken = await executeRecaptcha('enquiry_form');

    const response = await $fetch('/api/submit-enquiry', {
      method: 'POST',
      body: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || '',
        enquiryType: form.enquiryType,
        message: form.message.trim(),
        recaptchaToken
      }
    });

    if (response.success) {
      // Reset form
      Object.assign(form, {
        fullName: '',
        email: '',
        phone: '',
        enquiryType: 'course_info',
        message: ''
      });

      successMessage.value = 'Thank you! Your enquiry has been submitted successfully. We will respond within 2-3 business days.';
      
      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        successMessage.value = '';
      }, 10000);
    } else {
      if (response.errors && response.errors.length > 0) {
        errors.value = response.errors.map((err: any) => err.message || `${err.field}: ${err.message}`);
      } else {
        errors.value = [response.message || 'An error occurred while submitting the enquiry. Please try again.'];
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
