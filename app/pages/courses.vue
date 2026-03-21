<template>
  <div class="min-h-screen bg-light-beige dark:bg-bg-dark">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary-green to-accent-gold text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Our Courses</h1>
          <p class="text-xl">Explore our comprehensive range of beauty and wellness programs</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">Beauty Training Programs</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Course 1 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Cosmetology Diploma</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Comprehensive training in skincare, makeup, and beauty treatments. Learn the latest techniques and trends.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-primary-green font-medium">Duration: 12 months</span>
                <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                  Apply Now
                </NuxtLink>
              </div>
            </div>

            <!-- Course 2 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Esthetics Certificate</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Specialized training in skin care, facials, and advanced esthetic treatments.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-primary-green dark:text-accent-gold font-medium">Duration: 6 months</span>
                <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                  Apply Now
                </NuxtLink>
              </div>
            </div>

            <!-- Course 3 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Nail Technology</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Master manicure and pedicure techniques, nail art, and salon management skills.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-primary-green dark:text-accent-gold font-medium">Duration: 3 months</span>
                <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                  Apply Now
                </NuxtLink>
              </div>
            </div>

            <!-- Course 4 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Makeup Artistry</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Professional makeup application techniques for fashion, film, and everyday looks.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-primary-green dark:text-accent-gold font-medium">Duration: 4 months</span>
                <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                  Apply Now
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Categories Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">Course Categories</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="bg-primary-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Beginner Courses</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Perfect for newcomers to the beauty industry
              </p>
            </div>

            <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="bg-primary-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Advanced Courses</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                For experienced professionals looking to specialize
              </p>
            </div>

            <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="bg-primary-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Specialized Workshops</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Short-term focused training on specific skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accreditation Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Accredited Programs</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Our courses are accredited through collaboration with recognized institutions, ensuring quality education that meets industry standards.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <span class="bg-primary-green text-white px-4 py-2 rounded-full">SABS Certified</span>
            <span class="bg-primary-green text-white px-4 py-2 rounded-full">Industry Recognized</span>
            <span class="bg-primary-green text-white px-4 py-2 rounded-full">Trending Skills</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-primary-green to-accent-gold text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6">Ready to Start Your Beauty Career?</h2>
          <p class="mb-8">
            Explore our courses and take the first step towards a rewarding career in the beauty industry.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/application" class="bg-white dark:bg-gray-700 text-primary-green dark:text-accent-gold hover:bg-gray-100 dark:hover:bg-gray-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Apply Now
            </NuxtLink>
            <NuxtLink to="/contact" class="bg-transparent border-2 border-white hover:bg-white hover:text-primary-green dark:hover:bg-gray-700 dark:hover:text-accent-gold font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Import SEO composable
import { setCustomSeoMeta } from '~/composables/useSeoMeta';

// Set SEO meta for courses page
setCustomSeoMeta({
  title: 'Beauty Courses in South Africa | Accredited Programs at BKN Beauty Academy',
  description: 'Explore accredited beauty courses at BKN Beauty Academy in South Africa. Cosmetology, esthetics, nail technology, makeup artistry & more. Enroll today!',
  keywords: 'beauty courses, beauty school south africa, accredited beauty courses, cosmetology courses, esthetics courses, nail technology, makeup artistry, beauty training programs',
  ogTitle: 'Beauty Courses in South Africa | Accredited Programs at BKN Beauty Academy',
  ogDescription: 'Explore accredited beauty courses at BKN Beauty Academy in South Africa. Cosmetology, esthetics, nail technology, makeup artistry & more.',
  ogImage: '/images/courses-og.jpg', // Placeholder - will need actual image
  twitterTitle: 'Beauty Courses in South Africa | Accredited Programs at BKN Beauty Academy',
  twitterDescription: 'Explore accredited beauty courses at BKN Beauty Academy in South Africa. Cosmetology, esthetics, nail technology, makeup artistry & more.',
  twitterImage: '/images/courses-twitter.jpg' // Placeholder - will need actual image
});
</script>