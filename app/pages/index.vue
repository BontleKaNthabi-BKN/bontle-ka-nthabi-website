<template>
  <div class="min-h-screen bg-light-beige dark:bg-bg-dark">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-green to-accent-gold text-white">
      <div class="container mx-auto px-4 py-24">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Crafting Careers in Beauty</h1>
          <p class="text-xl mb-8">
            Join our accredited beauty academy and start your journey to a rewarding career in the beauty industry
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/application" class="bg-white text-primary-green hover:bg-gray-100 dark:bg-gray-200 dark:text-primary-green dark:hover:bg-gray-300 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Apply Now
            </NuxtLink>
            <NuxtLink to="/enquiry" class="bg-transparent border-2 border-white hover:bg-white hover:text-primary-green dark:border-gray-300 dark:hover:bg-gray-200 dark:hover:text-primary-green font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Why Choose Our Academy</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide quality education with industry-standard training to prepare you for success
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="text-center">
            <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Accredited Programs</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Our courses are accredited through collaboration with recognized institutions, ensuring quality education.
            </p>
          </div>

          <div class="text-center">
            <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Trending Skills</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Learn the latest techniques and trends in beauty, going beyond the normal curriculum.
            </p>
          </div>

          <div class="text-center">
            <div class="bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Certified Instructors</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Learn from experienced professionals who are certified in their respective fields.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-16 bg-gray-50 dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Our Programs</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our comprehensive range of beauty training programs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-600 rounded-lg shadow dark:shadow-gray-900 p-6 text-center">
            <div class="bg-primary-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Cosmetology</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Comprehensive training in skincare, makeup, and beauty treatments</p>
            <NuxtLink to="/services" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
              Learn More
            </NuxtLink>
          </div>

          <div class="bg-white dark:bg-gray-600 rounded-lg shadow dark:shadow-gray-900 p-6 text-center">
            <div class="bg-primary-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Esthetics</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Specialized training in skin care and advanced esthetic treatments</p>
            <NuxtLink to="/services" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
              Learn More
            </NuxtLink>
          </div>

          <div class="bg-white dark:bg-gray-600 rounded-lg shadow dark:shadow-gray-900 p-6 text-center">
            <div class="bg-primary-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Nail Technology</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Master manicure and pedicure techniques and nail art</p>
            <NuxtLink to="/services" class="text-primary-green dark:text-accent-gold font-medium hover:underline">
              Learn More
            </NuxtLink>
          </div>
        </div>

        <div class="text-center mt-10">
          <NuxtLink to="/services" class="bg-primary-green text-white hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            View All Programs
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Our Gallery</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View our work, facilities, and student achievements
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="aspect-square bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl" />
          <div class="aspect-square bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl" />
          <div class="aspect-square bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl" />
          <div class="aspect-square bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl" />
        </div>

        <div class="text-center mt-10">
          <NuxtLink to="/gallery" class="bg-primary-green text-white hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            View Gallery
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="py-16 bg-gray-50 dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2">
            <div class="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-full h-80" />
          </div>
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">About Our Academy</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Founded by Bontle Ka Nthabi (Pty) Ltd, our beauty academy is dedicated to crafting careers in beauty
              through quality education and training. We believe that everyone deserves the opportunity to pursue
              their passion in the beauty industry.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Our academy provides accredited certificates through collaboration with recognized institutions,
              ensuring our students receive quality education that meets industry standards.
            </p>
            <NuxtLink to="/about" class="bg-primary-green text-white hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Learn More About Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-100 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Start Your Beauty Career Today</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Join hundreds of successful graduates who have launched their careers in the beauty industry.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/application" class="bg-primary-green text-white hover:bg-opacity-90 dark:bg-primary-green-dark dark:hover:bg-opacity-90 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Apply Now
            </NuxtLink>
            <NuxtLink to="/contact" class="bg-white dark:bg-gray-700 text-primary-green dark:text-accent-gold border border-primary-green dark:border-accent-gold hover:bg-gray-50 dark:hover:bg-gray-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
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

// Set SEO meta for homepage
setCustomSeoMeta({
  title: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
  description: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more. Enroll today!',
  keywords: 'beauty academy, beauty courses, beauty school, south africa, accredited courses, cosmetology, makeup artistry, nail technician, esthetician, beauty training',
  ogTitle: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
  ogDescription: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more.',
  ogImage: '/images/homepage-og.jpg', // Placeholder - will need actual image
  twitterTitle: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
  twitterDescription: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more.',
  twitterImage: '/images/homepage-twitter.jpg' // Placeholder - will need actual image
});
</script>