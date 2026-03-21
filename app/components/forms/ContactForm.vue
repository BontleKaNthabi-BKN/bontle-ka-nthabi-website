<template>
  <div class="form-container">
    <h2>Contact Us</h2>
    <form @submit.prevent="submitContact">
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
        <label for="subject" class="form-label">Subject *</label>
        <select
          id="subject"
          v-model="form.subject"
          class="form-input"
          required
        >
          <option value="" disabled>Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="courses">Courses Information</option>
          <option value="admissions">Admissions</option>
          <option value="schedule">Class Schedule</option>
          <option value="other">Other</option>
        </select>
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
        <label for="attachment" class="form-label">Attachment (Optional)</label>
        <input
          type="file"
          id="attachment"
          @change="handleFileUpload"
          class="form-input-file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Max file size: 10MB. Accepted formats: PDF, DOC, DOCX, JPG, PNG</p>
      </div>

      <div class="form-field">
        <button type="submit" class="form-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </div>

      <!-- Error messages -->
      <div v-if="errors.length" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <ul class="list-disc pl-5">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!-- Success message -->
      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
}

interface ContactSubmitRequest {
  fullName: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
  recaptchaToken?: string;
}

const form = reactive<ContactFormData>({
  fullName: '',
  email: '',
  subject: '',
  phone: '',
  message: ''
});

const errors = ref<string[]>([]);
const successMessage = ref<string>('');
const isSubmitting = ref(false);
const fileData = ref<File | null>(null);

// Handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    fileData.value = target.files[0];
  }
};

// Function to execute reCAPTCHA
const executeRecaptcha = async (action: string = 'contact_form'): Promise<string> => {
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

// Submit the contact form
const submitContact = async () => {
  errors.value = [];
  successMessage.value = '';
  isSubmitting.value = true;

  try {
    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha('contact_form');

    // Validate form data
    const formDataToSend = new FormData();

    // Append form fields to FormData
    formDataToSend.append('fullName', form.fullName);
    formDataToSend.append('email', form.email);
    formDataToSend.append('subject', form.subject);
    formDataToSend.append('phone', form.phone || '');
    formDataToSend.append('message', form.message);
    formDataToSend.append('recaptchaToken', recaptchaToken); // Add reCAPTCHA token

    // Append file if it exists
    if (fileData.value) {
      formDataToSend.append('attachment', fileData.value, fileData.value.name);
    }

    // Submit form with multipart data
    const response = await $fetch('/api/submit-contact', {
      method: 'POST',
      body: formDataToSend
    });

    if (response.success) {
      // Reset form
      Object.assign(form, {
        fullName: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
      });

      // Reset file input
      fileData.value = null;
      const fileInput = document.getElementById('attachment') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Show success message
      successMessage.value = response.message || 'Message sent successfully!';
    } else {
      // Handle validation errors
      if (response.errors && response.errors.length > 0) {
        errors.value = response.errors.map((err: any) => `${err.field}: ${err.message}`);
      } else {
        errors.value = [response.message || 'An error occurred while sending the message'];
      }
    }
  } catch (error: any) {
    console.error('Submission error:', error);
    // Check if the error is related to the API endpoint
    if (error?.data?.url?.includes('/api/submit-contact')) {
      errors.value = ['There was an issue connecting to the submission server. Please try again later.'];
    } else {
      errors.value = [error.message || 'An unexpected error occurred'];
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
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green dark:bg-gray-700 dark:text-white;
}

.form-input-file {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green dark:bg-gray-700 dark:text-white;
}

.form-button {
  @apply w-full bg-primary-green hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-md transition duration-300;
}
</style>