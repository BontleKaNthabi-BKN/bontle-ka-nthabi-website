<template>
  <div class="min-h-screen bg-light-beige dark:bg-bg-dark">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary-green to-accent-gold text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Our Services</h1>
          <p class="text-xl">Discover the range of beauty services and training programs we offer</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">Beauty Training Programs</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Service 1 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Cosmetology</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Comprehensive training in skincare, makeup, and beauty treatments. Learn the latest techniques and trends.
              </p>
              <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                Apply for this course
              </NuxtLink>
            </div>

            <!-- Service 2 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Esthetics</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Specialized training in skin care, facials, and advanced esthetic treatments.
              </p>
              <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                Apply for this course
              </NuxtLink>
            </div>

            <!-- Service 3 -->
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
              <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                Apply for this course
              </NuxtLink>
            </div>

            <!-- Service 4 -->
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
              <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                Apply for this course
              </NuxtLink>
            </div>

            <!-- Service 5 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Hair Styling</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Cutting, coloring, styling, and chemical services for all hair types and textures.
              </p>
              <NuxtLink to="/application" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                Apply for this course
              </NuxtLink>
            </div>

            <!-- Service 6 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Specialized Workshops</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Short-term workshops focusing on specific skills and emerging trends in the beauty industry.
              </p>
              <NuxtLink to="/enquiry" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
                Enquire about workshops
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Services Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Additional Services</h2>
          <p class="text-gray-600 dark:text-gray-300">
            Beyond our core training programs, we offer additional services to support your beauty career.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Career Placement Assistance</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              We help our graduates find employment opportunities in salons, spas, and other beauty establishments.
            </p>
            <ul class="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Resume building and interview preparation</li>
              <li>Networking opportunities with industry professionals</li>
              <li>Ongoing career guidance and support</li>
            </ul>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Continuing Education</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Stay current with industry trends through our continuing education programs.
            </p>
            <ul class="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Advanced technique workshops</li>
              <li>Product knowledge training</li>
              <li>Business management for beauty professionals</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gray-50 dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Ready to Start Your Beauty Career?</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Explore our programs and take the first step towards a rewarding career in the beauty industry.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/application" class="bg-primary-green text-white hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Apply Now
            </NuxtLink>
            <NuxtLink to="/enquiry" class="bg-white dark:bg-gray-700 text-primary-green dark:text-accent-gold border border-primary-green dark:border-accent-gold hover:bg-gray-50 dark:hover:bg-gray-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
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

// Set SEO meta for services page
setCustomSeoMeta({
  title: 'Beauty Services & Training Programs | BKN Beauty Academy',
  description: 'Explore comprehensive beauty services and training programs at BKN Beauty Academy. Cosmetology, esthetics, nail technology, makeup artistry & more. Enroll today!',
  keywords: 'beauty services, beauty training programs, cosmetology services, esthetics training, nail technology, makeup artistry, beauty courses south africa',
  ogTitle: 'Beauty Services & Training Programs | BKN Beauty Academy',
  ogDescription: 'Explore comprehensive beauty services and training programs at BKN Beauty Academy. Cosmetology, esthetics, nail technology, makeup artistry & more.',
  ogImage: '/images/services-og.jpg', // Placeholder - will need actual image
  twitterTitle: 'Beauty Services & Training Programs | BKN Beauty Academy',
  twitterDescription: 'Explore comprehensive beauty services and training programs at BKN Beauty Academy. Cosmetology, esthetics, nail technology, makeup artistry & more.',
  twitterImage: '/images/services-twitter.jpg' // Placeholder - will need actual image
});
</script>