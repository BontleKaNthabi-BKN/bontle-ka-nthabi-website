<template>
  <div class="file-upload-container">
    <div
      class="upload-area"
      :class="{ 'drag-over': isDragOver, 'disabled': disabled }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="disabled ? null : triggerFileSelect"
    >
      <input
        ref="fileInputRef"
        type="file"
        multiple
        :accept="allowedFileTypes.join(',')"
        @change="handleFileChange"
        class="hidden"
        :disabled="disabled"
      />
      <div class="upload-content">
        <svg
          class="upload-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p class="upload-text">
          Drag & drop files here or <span class="browse-text">browse</span>
        </p>
        <p class="file-types">Supports: {{ allowedFileTypes.join(', ').replace(/\./g, '') }}</p>
        <p class="file-size">Max file size: {{ maxFileSize }}MB</p>
      </div>
    </div>

    <!-- Uploaded files list -->
    <div v-if="selectedFiles.length" class="uploaded-files mt-4">
      <h3 class="text-lg font-medium mb-2">Selected Files:</h3>
      <ul class="space-y-2">
        <li 
          v-for="(file, index) in selectedFiles" 
          :key="index"
          class="flex items-center justify-between p-2 border rounded"
        >
          <div class="flex items-center">
            <svg 
              class="file-icon mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>{{ file.name }}</span>
            <span class="text-xs text-gray-500 ml-2">({{ formatFileSize(file.size) }})</span>
          </div>
          <button 
            type="button" 
            @click="removeFile(index)"
            class="text-red-500 hover:text-red-700"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fill-rule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clip-rule="evenodd" 
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <!-- Error messages -->
    <div v-if="errors.length" class="error-messages mt-4">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <ul class="list-disc pl-5">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define props
interface Props {
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[]; // e.g., ['.pdf', '.jpg', '.jpeg', '.png']
  maxFiles?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxFileSize: 10, // 10MB default
  allowedFileTypes: () => ['.pdf', '.jpg', '.jpeg', '.png'],
  maxFiles: 5,
  disabled: false
});

// Define emits
const emit = defineEmits<{
  'files-selected': [fileIds: string[]];
}>();

// Reactive data
const fileInputRef = ref<HTMLInputElement>();
const selectedFiles = ref<File[]>([]);
const isDragOver = ref(false);
const errors = ref<string[]>([]);

// Format file size for display
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Trigger file selection dialog
const triggerFileSelect = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

// Handle drag over event
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

// Handle drag leave event
const handleDragLeave = () => {
  isDragOver.value = false;
};

// Handle drop event
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
  
  if (event.dataTransfer?.files) {
    processFiles(event.dataTransfer.files);
  }
};

// Handle file input change
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    processFiles(target.files);
  }
};

// Process selected files
const processFiles = (files: FileList) => {
  errors.value = [];
  
  // Check number of files
  if (selectedFiles.value.length + files.length > props.maxFiles) {
    errors.value.push(`Maximum ${props.maxFiles} files allowed`);
    return;
  }
  
  // Process each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!props.allowedFileTypes.includes(fileExtension)) {
      errors.value.push(`File type ${fileExtension} not allowed. Allowed types: ${props.allowedFileTypes.join(', ')}`);
      continue;
    }
    
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > props.maxFileSize) {
      errors.value.push(`${file.name} exceeds ${props.maxFileSize}MB limit`);
      continue;
    }
    
    // Add file to selected files
    selectedFiles.value.push(file);
  }
  
  // Emit selected files
  emitFilesSelected();
};

// Remove a file
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
  emitFilesSelected();
};

// Emit selected files
const emitFilesSelected = () => {
  // Emit the actual File objects so parent can handle upload
  emit('files-selected', selectedFiles.value);
};

// Clear all selected files
const clearFiles = () => {
  selectedFiles.value = [];
  errors.value = [];
  emitFilesSelected();
};

// Expose clearFiles method to parent components
defineExpose({
  clearFiles
});
</script>

<style scoped>
.file-upload-container {
  @apply w-full;
}

.upload-area {
  @apply border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-8 text-center transition-colors;
}

.upload-area.drag-over {
  @apply border-primary-green bg-green-50;
}

.upload-area.disabled {
  @apply border-gray-200 bg-gray-50 cursor-not-allowed opacity-60;
}

.upload-content {
  @apply flex flex-col items-center;
}

.upload-icon {
  @apply h-12 w-12 text-gray-400 mb-2;
}

.upload-text {
  @apply text-gray-600 mb-1;
}

.browse-text {
  @apply text-primary-green font-semibold underline;
}

.file-types, .file-size {
  @apply text-sm text-gray-500;
}

.hidden {
  display: none;
}
</style>