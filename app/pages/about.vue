<template>
  <div class="min-h-screen bg-light-beige dark:bg-bg-dark">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary-green to-accent-gold text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">About Us</h1>
          <p class="text-xl">Learn more about our mission and commitment to beauty education</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Our Story</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Founded by Bontle Ka Nthabi (Pty) Ltd, our beauty academy is dedicated to crafting careers in beauty
                through quality education and training. We believe that everyone deserves the opportunity to pursue
                their passion in the beauty industry.
              </p>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Our academy provides accredited certificates through collaboration with recognized institutions,
                ensuring our students receive quality education that meets industry standards.
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                We offer trending skills over and above the normal curriculum, preparing our students for success
                in today's competitive beauty market.
              </p>
            </div>
            <div>
              <img 
                src="/images/gallery/photos/gallery-09.jpg" 
                alt="Our Story" 
                loading="lazy" 
                decoding="async" 
                class="w-full h-80 object-cover object-top rounded-xl shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Values Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">Our Mission & Values</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Quality Education</h3>
              <p class="text-gray-600 dark:text-gray-300">
                We provide high-quality, accredited education that prepares students for successful careers in the beauty industry.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Student Focus</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Our programs are designed with the student in mind, offering flexible schedules and personalized attention.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Innovation</h3>
              <p class="text-gray-600 dark:text-gray-300">
                We continuously update our curriculum to include the latest trends and techniques in the beauty industry.
              </p>
            </div>
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
            Join our community of beauty professionals and take the first step towards a rewarding career.
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

// Set SEO meta for about page
setCustomSeoMeta({
  title: 'About BKN Beauty Academy | Accredited Beauty School in South Africa',
  description: 'Learn about BKN Beauty Academy, a leading beauty school in South Africa offering accredited courses. Discover our mission, values, and commitment to quality education.',
  keywords: 'about beauty academy, beauty school south africa, accredited beauty courses, beauty education, beauty training',
  ogTitle: 'About BKN Beauty Academy | Accredited Beauty School in South Africa',
  ogDescription: 'Learn about BKN Beauty Academy, a leading beauty school in South Africa offering accredited courses.',
  ogImage: '/images/gallery/photos/gallery-07.jpg',
  twitterTitle: 'About BKN Beauty Academy | Accredited Beauty School in South Africa',
  twitterDescription: 'Learn about BKN Beauty Academy, a leading beauty school in South Africa offering accredited courses.',
  twitterImage: '/images/gallery/photos/gallery-08.jpg'
});
</script>