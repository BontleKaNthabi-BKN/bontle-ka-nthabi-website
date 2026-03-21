<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  // Toggle between light and dark modes
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

// Computed for displaying the correct icon
const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <button
    @click="toggleColorMode"
    class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-green"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
  >
    <!-- Sun icon for dark mode (when it's currently dark) -->
    <svg 
      v-if="isDark" 
      class="w-5 h-5 text-yellow-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <!-- Moon icon for light mode (when it's currently light) -->
    <svg 
      v-else 
      class="w-5 h-5 text-indigo-700" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>