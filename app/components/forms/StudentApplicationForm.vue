<template>
  <div class="form-container">
    <h2>Student Application Form</h2>
    <form @submit.prevent="submitApplication">
      <div class="form-field">
        <label for="firstName" class="form-label">First Name *</label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          class="form-input"
          required
          maxlength="50"
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
        />
      </div>

      <div class="form-field">
        <label for="phone" class="form-label">Phone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="form-input"
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
        ></textarea>
      </div>

      <div class="form-field">
        <label for="courseSelection" class="form-label">Course Selection *</label>
        <select
          id="courseSelection"
          v-model="form.courseSelection"
          class="form-input"
          required
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
        />
      </div>

      <div class="form-field">
        <button type="submit" class="form-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>

      <!-- Error messages -->
      <div v-if="errors.length" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <ul class="list-disc pl-5">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
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
const isSubmitting = ref(false);
const fileUploadRef = ref();

// Handle files selected in the FileUpload component
const handleFilesSelected = (fileIds: string[]) => {
  form.supportingDocuments = fileIds;
};

// Function to execute reCAPTCHA
const executeRecaptcha = async (action: string = 'application_form'): Promise<string> => {
  const config = useRuntimeConfig();
  const recaptchaSiteKey = config.public.recaptchaSiteKey;

  if (!recaptchaSiteKey) {
    console.error('reCAPTCHA site key is not configured in runtime config');
    // For development, return a dummy token
    return 'dummy-token-for-development';
  }

  // Wait for grecaptcha to be available
  if (typeof window !== 'undefined') {
    // Wait for reCAPTCHA to load
    await new Promise((resolve) => {
      const checkRecaptcha = () => {
        if ((window as any).grecaptcha && (window as any).grecaptcha.ready) {
          resolve(true);
        } else {
          setTimeout(checkRecaptcha, 500); // Check every 500ms
        }
      };
      checkRecaptcha();
    });

    return new Promise((resolve, reject) => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha.execute(recaptchaSiteKey, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  } else {
    console.error('reCAPTCHA is not loaded');
    // For development or if reCAPTCHA library fails to load, return a dummy token
    return 'dummy-token-for-development';
  }
};

// Submit the application form
const submitApplication = async () => {
  errors.value = [];
  isSubmitting.value = true;

  try {
    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha('application_form');

    // Validate form data
    const response = await $fetch('/api/submit-application', {
      method: 'POST',
      body: {
        ...form,
        dateOfBirth: new Date(form.dateOfBirth).toISOString(),
        recaptchaToken
      }
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

      // Show success message
      alert('Application submitted successfully!');
    } else {
      // Handle validation errors
      if (response.errors && response.errors.length > 0) {
        errors.value = response.errors.map((err: any) => `${err.field}: ${err.message}`);
      } else {
        errors.value = [response.message || 'An error occurred while submitting the application'];
      }
    }
  } catch (error: any) {
    console.error('Submission error:', error);
    errors.value = [error.message || 'An unexpected error occurred'];
  } finally {
    isSubmitting.value = false;
  }
};
</script>