<template>
  <div class="confirmation-container">
    <div v-if="showConfirmation" class="confirmation-content">
      <div class="confirmation-icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-16 w-16 text-green-500 mx-auto" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      <h2 class="confirmation-title">Thank You!</h2>
      <p class="confirmation-message">
        Your {{ formType }} has been submitted successfully.
      </p>
      <p class="confirmation-reference" v-if="submissionId">
        Reference ID: <span class="font-bold">{{ submissionId }}</span>
      </p>
      <p class="confirmation-note">
        We will review your submission and get back to you shortly.
      </p>
      <div class="confirmation-actions mt-6">
        <button 
          @click="closeConfirmation" 
          class="btn-primary"
        >
          Close
        </button>
      </div>
    </div>
    
    <div v-else-if="showError" class="error-content">
      <div class="error-icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-16 w-16 text-red-500 mx-auto" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </div>
      <h2 class="error-title">Submission Failed</h2>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-actions mt-6">
        <button 
          @click="retrySubmission" 
          class="btn-secondary mr-4"
        >
          Retry
        </button>
        <button 
          @click="closeError" 
          class="btn-primary"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define props
interface Props {
  showConfirmation?: boolean;
  showError?: boolean;
  submissionId?: string;
  formType?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showConfirmation: false,
  showError: false,
  submissionId: '',
  formType: 'form',
  errorMessage: 'An error occurred during submission.'
});

// Define emits
const emit = defineEmits<{
  'close': [];
  'retry': [];
}>();

// Close confirmation
const closeConfirmation = () => {
  emit('close');
};

// Close error message
const closeError = () => {
  emit('close');
};

// Retry submission
const retrySubmission = () => {
  emit('retry');
};
</script>

<style scoped>
.confirmation-container {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4;
}

.confirmation-content {
  @apply bg-white rounded-lg shadow-xl p-8 max-w-md w-full;
}

.error-content {
  @apply bg-white rounded-lg shadow-xl p-8 max-w-md w-full;
}

.confirmation-title, .error-title {
  @apply text-2xl font-bold text-center mb-4;
}

.confirmation-message, .error-message, .confirmation-note {
  @apply text-center mb-4;
}

.confirmation-reference {
  @apply text-center mb-4 text-lg font-semibold text-primary-green;
}

.confirmation-actions, .error-actions {
  @apply flex justify-center;
}

.btn-primary {
  @apply bg-primary-green hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition-colors;
}

.btn-secondary {
  @apply bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition-colors;
}

.mt-6 {
  @apply mt-6;
}

.mr-4 {
  @apply mr-4;
}

.text-2xl {
  @apply text-2xl;
}

.font-bold {
  @apply font-bold;
}

.text-center {
  @apply text-center;
}

.mb-4 {
  @apply mb-4;
}

.mb-2 {
  @apply mb-2;
}

.text-lg {
  @apply text-lg;
}

.font-semibold {
  @apply font-semibold;
}

.text-primary-green {
  @apply text-primary-green;
}

.fixed {
  @apply fixed;
}

.inset-0 {
  @apply inset-0;
}

/* Remove all @apply statements that cause circular dependencies */
/* These are already handled by Tailwind classes in the template */
</style>