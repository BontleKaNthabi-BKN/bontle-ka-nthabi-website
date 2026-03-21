<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center">
            <img src="/images/logo.png" alt="BKN Beauty Academy Logo" class="h-44 w-auto max-w-full" />
          </div>
          <p class="mt-4 text-base text-gray-500 dark:text-gray-300">
            Crafting careers in beauty through quality education and training.
          </p>
          <div class="mt-4 flex space-x-6">
            <!-- Social media icons would go here -->
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Quick Links</h3>
          <ul class="mt-4 space-y-4">
            <li>
              <NuxtLink to="/" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Services</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/gallery" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Gallery</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Programs</h3>
          <ul class="mt-4 space-y-4">
            <li>
              <NuxtLink to="/application" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Apply Now</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/enquiry" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Enquire</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/courses" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Courses</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admissions" class="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Admissions</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Contact Info</h3>
          <ul class="mt-4 space-y-4">
            <li class="text-base text-gray-500 dark:text-gray-300">
              <span class="block">Email:</span>
              <a href="mailto:nthabi@bknbeautyacademy.co.za" class="hover:text-gray-900 dark:hover:text-gray-100">nthabi@bknbeautyacademy.co.za</a>
            </li>
            <li class="text-base text-gray-500 dark:text-gray-300">
              <span class="block">Phone:</span>
              <a href="tel:+27638429997" class="hover:text-gray-900 dark:hover:text-gray-100">+27 63 842 9997</a>
            </li>
            <li class="text-base text-gray-500 dark:text-gray-300">
              <span class="block">Location:</span>
              <span>Mbombela, South Africa</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <p class="text-base text-gray-400 dark:text-gray-500 text-center">
          &copy; {{ new Date().getFullYear() }} Beauty Academy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component for the beauty academy website
</script>