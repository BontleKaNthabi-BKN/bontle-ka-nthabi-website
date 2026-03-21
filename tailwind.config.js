/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      colors: {
        'primary-green': '#2d4a3b',
        'primary-green-dark': '#4a7a5f', // Darker variant for better contrast in dark mode
        'accent-gold': '#d4af37',
        'accent-gold-dark': '#e5c158', // Lighter variant for better contrast in dark mode
        'light-beige': '#f8f5f0',
        'light-beige-dark': '#1a1a1a', // Dark variant for dark mode
        'text-dark': '#1a1a1a',
        'text-light': '#ffffff',
        'text-dark-alt': '#e2e8f0', // Better text color for dark backgrounds
        'bg-light': '#ffffff',
        'bg-dark': '#0f172a',
        'card-light': '#f8f5f0',
        'card-dark': '#1e293b',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',
      }
    },
  },
  plugins: [],
}