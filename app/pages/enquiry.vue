<template>
  <div class="min-h-screen bg-light-beige dark:bg-bg-dark">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary-green to-accent-gold text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Enquire About Our Courses</h1>
          <p class="text-xl">Have questions about our beauty programs? Send us an enquiry and we'll get back to you</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">"Crafting careers in beauty"</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We offer accredited certificates through collaboration and trending skills over and above the normal curriculum.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <!-- Enquiry Form -->
            <div class="lg:col-span-1">
              <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Send Us Your Enquiry</h3>
              <EnquiryForm />
            </div>

            <!-- Information Panel -->
            <div class="lg:col-span-1">
              <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">About Our Academy</h3>

                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Our Value Proposition</h4>
                    <ul class="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      <li>Accredited certificates through collaboration</li>
                      <li>Trending skills over and above the normal curriculum</li>
                      <li>Professional and trustworthy service</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Target Audience</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Youth between the ages of 18 & 35 seeking beauty education for self-employment,
                      university/college students looking to sustain themselves financially,
                      and people in remote areas wanting to start businesses.
                    </p>
                  </div>

                  <div>
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Contact Information</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Email: <a href="mailto:nthabi@bknbeautyacademy.co.za" class="text-primary-green dark:text-accent-gold hover:underline">nthabi@bknbeautyacademy.co.za</a><br>
                      Phone: <a href="tel:+27638429997" class="text-primary-green dark:text-accent-gold hover:underline">+27 63 842 9997</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">Frequently Asked Questions</h2>

          <div class="space-y-6">
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">What courses do you offer?</h3>
              <p class="text-gray-600 dark:text-gray-300">
                We offer courses in cosmetology, esthetics, nail technology, makeup artistry, hair styling, and more.
                All our courses are accredited and prepare you for state licensing exams.
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">How long are the programs?</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Program lengths vary depending on the course. Certificate programs typically range from 3-12 months,
                while diploma programs may take 1-2 years to complete.
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Are there financing options available?</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Yes, we offer various financing options and payment plans. Contact our admissions office for more information
                about scholarships and financial aid.
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">What are the admission requirements?</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Admission requirements vary by program, but generally include a high school diploma or equivalent.
                Some programs may have additional prerequisites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Start Your Beauty Career Today</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Join our community of beauty professionals and take the first step towards a rewarding career.
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

// Set SEO meta for enquiry page
setCustomSeoMeta({
  title: 'Enquire About Beauty Courses | Contact Us | BKN Beauty Academy',
  description: 'Send an enquiry about beauty courses at BKN Beauty Academy. Get information about our accredited programs, admission requirements, and more.',
  keywords: 'enquire beauty courses, beauty course information, contact beauty academy, beauty school south africa, beauty course enquiry form',
  ogTitle: 'Enquire About Beauty Courses | Contact Us | BKN Beauty Academy',
  ogDescription: 'Send an enquiry about beauty courses at BKN Beauty Academy. Get information about our accredited programs, admission requirements, and more.',
  ogImage: '/images/enquiry-og.jpg', // Placeholder - will need actual image
  twitterTitle: 'Enquire About Beauty Courses | Contact Us | BKN Beauty Academy',
  twitterDescription: 'Send an enquiry about beauty courses at BKN Beauty Academy. Get information about our accredited programs, admission requirements, and more.',
  twitterImage: '/images/enquiry-twitter.jpg' // Placeholder - will need actual image
});

// Component imports
import EnquiryForm from '~/components/forms/EnquiryForm.vue';
</script>