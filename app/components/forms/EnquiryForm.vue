<template>
  <div class="form-container">
    <h2>General Enquiry Form</h2>
    <form @submit.prevent="submitEnquiry" novalidate>
      <!-- Full Name Field -->
      <div class="form-field">
        <label for="fullName" class="form-label">
          Full Name <span class="required">*</span>
        </label>
        <input
          id="fullName"
          v-model="form.fullName"
          @blur="validateFullName"
          type="text"
          class="form-input"
          :class="{ 'input-error': fieldErrors.fullName, 'input-success': fieldTouched.fullName && !fieldErrors.fullName }"
          placeholder="Enter your full name"
          :disabled="isSubmitting"
        />
        <p v-if="fieldErrors.fullName" class="field-error">{{ fieldErrors.fullName }}</p>
      </div>

      <!-- Email Field -->
      <div class="form-field">
        <label for="email" class="form-label">
          Email Address <span class="required">*</span>
        </label>
        <input
          id="email"
          v-model="form.email"
          @blur="validateEmail"
          @input="clearError('email')"
          type="email"
          class="form-input"
          :class="{ 'input-error': fieldErrors.email, 'input-success': fieldTouched.email && !fieldErrors.email }"
          placeholder="your.email@example.com"
          :disabled="isSubmitting"
        />
        <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</p>
      </div>

      <!-- Phone Field -->
      <div class="form-field">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          id="phone"
          v-model="form.phone"
          @blur="validatePhone"
          @input="clearError('phone')"
          type="tel"
          class="form-input"
          :class="{ 'input-error': fieldErrors.phone }"
          placeholder="+27 12 345 6789"
          :disabled="isSubmitting"
        />
        <p v-if="fieldErrors.phone" class="field-error">{{ fieldErrors.phone }}</p>
      </div>

      <!-- Enquiry Type Field -->
      <div class="form-field">
        <label for="enquiryType" class="form-label">
          Enquiry Type <span class="required">*</span>
        </label>
        <select
          id="enquiryType"
          v-model="form.enquiryType"
          @change="validateEnquiryType"
          class="form-input"
          :class="{ 'input-error': fieldErrors.enquiryType, 'input-success': fieldTouched.enquiryType && !fieldErrors.enquiryType }"
          :disabled="isSubmitting"
        >
          <option value="" disabled>Select an enquiry type</option>
          <option value="course_info">Course Information</option>
          <option value="admission">Admission Requirements</option>
          <option value="schedule">Class Schedule</option>
          <option value="other">Other</option>
        </select>
        <p v-if="fieldErrors.enquiryType" class="field-error">{{ fieldErrors.enquiryType }}</p>
      </div>

      <!-- Message Field -->
      <div class="form-field">
        <label for="message" class="form-label">
          Message <span class="required">*</span>
          <span class="char-count">{{ form.message.length }}/1000</span>
        </label>
        <textarea
          id="message"
          v-model="form.message"
          @blur="validateMessage"
          @input="validateMessageLength"
          class="form-input"
          :class="{ 'input-error': fieldErrors.message, 'input-success': fieldTouched.message && !fieldErrors.message }"
          rows="5"
          placeholder="Tell us what you'd like to know..."
          :disabled="isSubmitting"
        ></textarea>
        <p v-if="fieldErrors.message" class="field-error">{{ fieldErrors.message }}</p>
      </div>

      <!-- Submit Button -->
      <div class="form-field">
        <button type="submit" class="form-button" :disabled="isSubmitting || !isFormValid">
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

      <!-- General Error messages -->
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
  enquiryType: string;
  recaptchaToken?: string;
}

interface FieldErrors {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

const form = reactive<FormData>({
  fullName: '',
  email: '',
  phone: '',
  enquiryType: '',
  message: ''
});

const errors = ref<string[]>([]);
const successMessage = ref<string>('');
const isSubmitting = ref(false);
const fieldTouched = ref<Record<string, boolean>>({
  fullName: false,
  email: false,
  phone: false,
  enquiryType: false,
  message: false
});
const fieldErrors = ref<FieldErrors>({
  fullName: '',
  email: '',
  phone: '',
  enquiryType: '',
  message: ''
});

// Validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
  name: /^[a-zA-Z\s'-]{2,100}$/
};

// Validation functions
const validateFullName = (): boolean => {
  fieldTouched.value.fullName = true;
  const value = form.fullName.trim();
  
  if (!value) {
    fieldErrors.value.fullName = 'Full name is required';
    return false;
  }
  
  if (value.length < 2) {
    fieldErrors.value.fullName = 'Name must be at least 2 characters';
    return false;
  }
  
  if (!patterns.name.test(value)) {
    fieldErrors.value.fullName = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return false;
  }
  
  fieldErrors.value.fullName = '';
  return true;
};

const validateEmail = (): boolean => {
  fieldTouched.value.email = true;
  const value = form.email.trim();
  
  if (!value) {
    fieldErrors.value.email = 'Email address is required';
    return false;
  }
  
  if (!patterns.email.test(value)) {
    fieldErrors.value.email = 'Please enter a valid email address (e.g., name@example.com)';
    return false;
  }
  
  fieldErrors.value.email = '';
  return true;
};

const validatePhone = (): boolean => {
  const value = form.phone.trim();
  
  if (!value) {
    fieldErrors.value.phone = ''; // Phone is optional
    return true;
  }
  
  if (!patterns.phone.test(value)) {
    fieldErrors.value.phone = 'Please enter a valid phone number (e.g., +27 12 345 6789)';
    return false;
  }
  
  fieldErrors.value.phone = '';
  return true;
};

const validateEnquiryType = (): boolean => {
  fieldTouched.value.enquiryType = true;
  
  if (!form.enquiryType) {
    fieldErrors.value.enquiryType = 'Please select an enquiry type';
    return false;
  }
  
  fieldErrors.value.enquiryType = '';
  return true;
};

const validateMessage = (): boolean => {
  fieldTouched.value.message = true;
  const value = form.message.trim();
  
  if (!value) {
    fieldErrors.value.message = 'Message is required';
    return false;
  }
  
  if (value.length < 10) {
    fieldErrors.value.message = 'Message must be at least 10 characters';
    return false;
  }
  
  if (value.length > 1000) {
    fieldErrors.value.message = 'Message cannot exceed 1000 characters';
    return false;
  }
  
  fieldErrors.value.message = '';
  return true;
};

const validateMessageLength = () => {
  if (form.message.length > 1000) {
    form.message = form.message.slice(0, 1000);
  }
  if (fieldTouched.value.message) {
    validateMessage();
  }
};

const clearError = (field: keyof FieldErrors) => {
  if (fieldErrors.value[field]) {
    fieldErrors.value[field] = '';
  }
};

// Computed property for form validity
const isFormValid = computed(() => {
  return (
    form.fullName.trim().length >= 2 &&
    patterns.email.test(form.email.trim()) &&
    form.enquiryType !== '' &&
    form.message.trim().length >= 10 &&
    !fieldErrors.value.fullName &&
    !fieldErrors.value.email &&
    !fieldErrors.value.enquiryType &&
    !fieldErrors.value.message
  );
});

// Execute reCAPTCHA
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

// Submit the enquiry form
const submitEnquiry = async () => {
  errors.value = [];
  successMessage.value = '';
  
  // Validate all fields
  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isEnquiryTypeValid = validateEnquiryType();
  const isMessageValid = validateMessage();
  
  if (!isFullNameValid || !isEmailValid || !isEnquiryTypeValid || !isMessageValid) {
    errors.value = ['Please correct the errors above before submitting.'];
    const firstError = document.querySelector('.input-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
        phone: form.phone.trim(),
        enquiryType: form.enquiryType,
        message: form.message.trim(),
        recaptchaToken
      }
    });

    if (response.success) {
      Object.assign(form, {
        fullName: '',
        email: '',
        phone: '',
        enquiryType: '',
        message: ''
      });

      fieldTouched.value = {
        fullName: false,
        email: false,
        phone: false,
        enquiryType: false,
        message: false
      };
      fieldErrors.value = {
        fullName: '',
        email: '',
        phone: '',
        enquiryType: '',
        message: ''
      };

      successMessage.value = 'Thank you! Your enquiry has been submitted successfully. We will respond within 2-3 business days.';
      
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
  @apply mb-5;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.required {
  @apply text-red-500;
}

.char-count {
  @apply float-right text-xs text-gray-500 dark:text-gray-400 font-normal;
}

.form-input {
  @apply w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
}

.form-input.input-error {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

.form-input.input-success {
  @apply border-green-500 focus:ring-green-500 focus:border-green-500;
}

.form-button {
  @apply w-full bg-primary-green hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center;
}

.field-error {
  @apply mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center;
}

.field-error::before {
  content: '⚠';
  margin-right: 0.25rem;
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
