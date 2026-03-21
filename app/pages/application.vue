<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Student Application</h1>
        <p class="text-lg text-gray-600">
          Apply for our beauty courses and start your career in the beauty industry
        </p>
      </header>

      <StudentApplicationForm />

      <section class="mt-12 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">About Our Courses</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Our beauty academy offers accredited courses that provide you with the skills and knowledge
          needed to succeed in the beauty industry. We offer courses in cosmetology, esthetics,
          nail technology, makeup artistry, and more.
        </p>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
          <li>Industry-certified instructors</li>
          <li>Hands-on learning experience</li>
          <li>Flexible scheduling options</li>
          <li>Job placement assistance</li>
        </ul>
        <p class="text-gray-600 dark:text-gray-300">
          Upon completion of our programs, you'll be prepared to take state licensing exams
          and start your career as a licensed beauty professional.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import SEO composable
import { setCustomSeoMeta } from '~/composables/useSeoMeta';

// Set SEO meta for application page
setCustomSeoMeta({
  title: 'Apply to Beauty Academy | Student Application Form | BKN Beauty Academy',
  description: 'Apply for accredited beauty courses at BKN Beauty Academy. Start your career in the beauty industry with our comprehensive training programs.',
  keywords: 'apply beauty academy, beauty course application, student application form, beauty school south africa, accredited beauty courses application',
  ogTitle: 'Apply to Beauty Academy | Student Application Form | BKN Beauty Academy',
  ogDescription: 'Apply for accredited beauty courses at BKN Beauty Academy. Start your career in the beauty industry with our comprehensive training programs.',
  ogImage: '/images/application-og.jpg', // Placeholder - will need actual image
  twitterTitle: 'Apply to Beauty Academy | Student Application Form | BKN Beauty Academy',
  twitterDescription: 'Apply for accredited beauty courses at BKN Beauty Academy. Start your career in the beauty industry with our comprehensive training programs.',
  twitterImage: '/images/application-twitter.jpg' // Placeholder - will need actual image
});

// Component imports
import StudentApplicationForm from '~/components/forms/StudentApplicationForm.vue';
</script>