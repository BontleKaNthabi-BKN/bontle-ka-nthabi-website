<template>
  <div class="form-container">
    <h2>Student Application Form</h2>
    <form @submit.prevent="submitApplication" enctype="multipart/form-data" novalidate>
      <!-- First Name Field -->
      <div class="form-field">
        <label for="firstName" class="form-label">
          First Name <span class="required">*</span>
        </label>
        <input
          id="firstName"
          v-model="form.firstName"
          @blur="validateFirstName"
          type="text"
          class="form-input"
          :class="{ 'input-error': fieldErrors.firstName, 'input-success': fieldTouched.firstName && !fieldErrors.firstName }"
          placeholder="Enter your first name"
          :disabled="isSubmitting"
        />
        <p v-if="fieldErrors.firstName" class="field-error">{{ fieldErrors.firstName }}</p>
      </div>

      <!-- Last Name Field -->
      <div class="form-field">
        <label for="lastName" class="form-label">
          Last Name <span class="required">*</span>
        </label>
        <input
          id="lastName"
          v-model="form.lastName"
          @blur="validateLastName"
          type="text"
          class="form-input"
          :class="{ 'input-error': fieldErrors.lastName, 'input-success': fieldTouched.lastName && !fieldErrors.lastName }"
          placeholder="Enter your last name"
          :disabled="isSubmitting"
        />
        <p v-if="fieldErrors.lastName" class="field-error">{{ fieldErrors.lastName }}</p>
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

      <!-- Date of Birth Field -->
      <div class="form-field">
        <label for="dateOfBirth" class="form-label">
          Date of Birth <span class="required">*</span>
          <span class="age-hint" v-if="ageYears > 0">({{ ageYears }} years old)</span>
        </label>
        <input
          id="dateOfBirth"
          v-model="form.dateOfBirth"
          @blur="validateDateOfBirth"
          @input="calculateAge"
          type="date"
          class="form-input"
          :class="{ 'input-error': fieldErrors.dateOfBirth, 'input-success': fieldTouched.dateOfBirth && !fieldErrors.dateOfBirth }"
          :disabled="isSubmitting"
        />
        <p v-if="fieldErrors.dateOfBirth" class="field-error">{{ fieldErrors.dateOfBirth }}</p>
      </div>

      <!-- Address Field -->
      <div class="form-field">
        <label for="address" class="form-label">Residential Address</label>
        <textarea
          id="address"
          v-model="form.address"
          @blur="validateAddress"
          class="form-input"
          :class="{ 'input-error': fieldErrors.address }"
          rows="3"
          placeholder="Enter your full address"
          maxlength="200"
          :disabled="isSubmitting"
        ></textarea>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ form.address.length }}/200 characters</p>
        <p v-if="fieldErrors.address" class="field-error">{{ fieldErrors.address }}</p>
      </div>

      <!-- Course Selection Field -->
      <div class="form-field">
        <label for="courseSelection" class="form-label">
          Course Selection <span class="required">*</span>
        </label>
        <select
          id="courseSelection"
          v-model="form.courseSelection"
          @change="validateCourseSelection"
          class="form-input"
          :class="{ 'input-error': fieldErrors.courseSelection, 'input-success': fieldTouched.courseSelection && !fieldErrors.courseSelection }"
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
        <p v-if="fieldErrors.courseSelection" class="field-error">{{ fieldErrors.courseSelection }}</p>
      </div>

      <!-- Supporting Documents -->
      <div class="form-field">
        <label for="supportingDocuments" class="form-label">Supporting Documents</label>
        <FileUpload
          id="supportingDocuments"
          ref="fileUploadRef"
          @files-selected="handleFilesSelected"
          :disabled="isSubmitting"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Max file size: 10MB per file. Accepted formats: PDF, DOC, DOCX, JPG, PNG
        </p>
        <p v-if="fieldErrors.supportingDocuments" class="field-error">{{ fieldErrors.supportingDocuments }}</p>
        <p v-if="selectedFiles.length > 0" class="file-selected">
          ✓ {{ selectedFiles.length }} file(s) selected
        </p>
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
          <span v-else>Submit Application</span>
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
import type { SubmitApplicationRequest } from '~/types/form-types';
import FileUpload from '~/components/forms/FileUpload.vue';

interface FormData extends SubmitApplicationRequest {
  dateOfBirth: string;
  recaptchaToken?: string;
}

interface FieldErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  courseSelection: string;
  supportingDocuments: string;
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
const ageYears = ref<number>(0);
const fieldTouched = ref<Record<string, boolean>>({
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  dateOfBirth: false,
  address: false,
  courseSelection: false
});
const fieldErrors = ref<FieldErrors>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  courseSelection: '',
  supportingDocuments: ''
});

// Validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
  name: /^[a-zA-Z\s'-]{2,50}$/
};

// Calculate age
const calculateAge = () => {
  if (!form.dateOfBirth) {
    ageYears.value = 0;
    return;
  }
  
  const birthDate = new Date(form.dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    ageYears.value = age - 1;
  } else {
    ageYears.value = age;
  }
};

// Validation functions
const validateFirstName = (): boolean => {
  fieldTouched.value.firstName = true;
  const value = form.firstName.trim();
  
  if (!value) {
    fieldErrors.value.firstName = 'First name is required';
    return false;
  }
  
  if (value.length < 2) {
    fieldErrors.value.firstName = 'First name must be at least 2 characters';
    return false;
  }
  
  if (!patterns.name.test(value)) {
    fieldErrors.value.firstName = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return false;
  }
  
  fieldErrors.value.firstName = '';
  return true;
};

const validateLastName = (): boolean => {
  fieldTouched.value.lastName = true;
  const value = form.lastName.trim();
  
  if (!value) {
    fieldErrors.value.lastName = 'Last name is required';
    return false;
  }
  
  if (value.length < 2) {
    fieldErrors.value.lastName = 'Last name must be at least 2 characters';
    return false;
  }
  
  if (!patterns.name.test(value)) {
    fieldErrors.value.lastName = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return false;
  }
  
  fieldErrors.value.lastName = '';
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

const validateDateOfBirth = (): boolean => {
  fieldTouched.value.dateOfBirth = true;
  
  if (!form.dateOfBirth) {
    fieldErrors.value.dateOfBirth = 'Date of birth is required';
    return false;
  }
  
  calculateAge();
  
  if (ageYears.value < 16) {
    fieldErrors.value.dateOfBirth = `You must be at least 16 years old to apply (you are ${ageYears.value})`;
    return false;
  }
  
  const today = new Date();
  const birthDate = new Date(form.dateOfBirth);
  if (birthDate > today) {
    fieldErrors.value.dateOfBirth = 'Date of birth cannot be in the future';
    return false;
  }
  
  fieldErrors.value.dateOfBirth = '';
  return true;
};

const validateAddress = (): boolean => {
  const value = form.address.trim();
  
  if (value.length > 200) {
    fieldErrors.value.address = 'Address cannot exceed 200 characters';
    return false;
  }
  
  fieldErrors.value.address = '';
  return true;
};

const validateCourseSelection = (): boolean => {
  fieldTouched.value.courseSelection = true;
  
  if (!form.courseSelection) {
    fieldErrors.value.courseSelection = 'Please select a course';
    return false;
  }
  
  fieldErrors.value.courseSelection = '';
  return true;
};

const clearError = (field: keyof FieldErrors) => {
  if (fieldErrors.value[field]) {
    fieldErrors.value[field] = '';
  }
};

// Handle files selected
const handleFilesSelected = (files: File[]) => {
  selectedFiles.value = files;
  fieldErrors.value.supportingDocuments = '';
};

// Computed property for form validity
const isFormValid = computed(() => {
  return (
    form.firstName.trim().length >= 2 &&
    form.lastName.trim().length >= 2 &&
    patterns.email.test(form.email.trim()) &&
    form.dateOfBirth !== '' &&
    ageYears.value >= 16 &&
    form.courseSelection !== '' &&
    !fieldErrors.value.firstName &&
    !fieldErrors.value.lastName &&
    !fieldErrors.value.email &&
    !fieldErrors.value.dateOfBirth &&
    !fieldErrors.value.courseSelection &&
    !fieldErrors.value.supportingDocuments
  );
});

// Execute reCAPTCHA
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

// Submit the application form
const submitApplication = async () => {
  errors.value = [];
  successMessage.value = '';
  
  // Validate all fields
  const validations = [
    validateFirstName(),
    validateLastName(),
    validateEmail(),
    validatePhone(),
    validateDateOfBirth(),
    validateAddress(),
    validateCourseSelection()
  ];
  
  if (!validations.every(v => v)) {
    errors.value = ['Please correct the errors above before submitting.'];
    const firstError = document.querySelector('.input-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  isSubmitting.value = true;

  try {
    const recaptchaToken = await executeRecaptcha('application_form');
    const formDataToSend = new FormData();

    formDataToSend.append('firstName', form.firstName.trim());
    formDataToSend.append('lastName', form.lastName.trim());
    formDataToSend.append('email', form.email.trim());
    formDataToSend.append('phone', form.phone.trim());
    formDataToSend.append('dateOfBirth', new Date(form.dateOfBirth).toISOString());
    formDataToSend.append('address', form.address.trim());
    formDataToSend.append('courseSelection', form.courseSelection);
    formDataToSend.append('recaptchaToken', recaptchaToken);

    for (const file of selectedFiles.value) {
      formDataToSend.append('attachments', file, file.name);
    }

    const response = await $fetch('/api/submit-application', {
      method: 'POST',
      body: formDataToSend
    });

    if (response.success) {
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

      if (fileUploadRef.value) {
        fileUploadRef.value.clearFiles();
      }
      selectedFiles.value = [];
      ageYears.value = 0;

      fieldTouched.value = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        dateOfBirth: false,
        address: false,
        courseSelection: false
      };
      fieldErrors.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        courseSelection: '',
        supportingDocuments: ''
      };

      successMessage.value = 'Thank you! Your application has been submitted successfully. We will review it and contact you within 2-3 business days.';
      
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

.age-hint {
  @apply float-right text-xs text-gray-500 dark:text-gray-400 font-normal ml-2;
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

.file-selected {
  @apply mt-1.5 text-sm text-green-600 dark:text-green-400 flex items-center;
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
