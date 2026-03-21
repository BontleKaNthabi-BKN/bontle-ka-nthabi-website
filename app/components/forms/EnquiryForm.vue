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
        <label for="enquiryType" class="form-label">Enquiry Type *</label>
        <select
          id="enquiryType"
          v-model="form.enquiryType"
          class="form-input"
          required
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
        ></textarea>
      </div>

      <div class="form-field">
        <button type="submit" class="form-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit Enquiry' }}
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
const isSubmitting = ref(false);

// Function to execute reCAPTCHA
const executeRecaptcha = async (action: string = 'enquiry_form'): Promise<string> => {
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

// Submit the enquiry form
const submitEnquiry = async () => {
  errors.value = [];
  isSubmitting.value = true;

  try {
    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha('enquiry_form');

    // Validate form data
    const response = await $fetch('/api/submit-enquiry', {
      method: 'POST',
      body: {
        ...form,
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

      // Show success message
      alert('Enquiry submitted successfully!');
    } else {
      // Handle validation errors
      if (response.errors && response.errors.length > 0) {
        errors.value = response.errors.map((err: any) => `${err.field}: ${err.message}`);
      } else {
        errors.value = [response.message || 'An error occurred while submitting the enquiry'];
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