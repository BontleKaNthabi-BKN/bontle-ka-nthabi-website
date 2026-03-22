<template>
  <div class="min-h-screen bg-light-beige">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary-green to-accent-gold text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Our Location</h1>
          <p class="text-xl">Find us in the heart of South Africa</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Location Information -->
            <div>
              <h2 class="text-3xl font-bold text-gray-800 mb-8">Visit Our Campus</h2>

              <div class="space-y-8">
                <!-- Address -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-green rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Address</h3>
                    <p class="text-gray-600 mt-1">
                      BKN Beauty Academy<br />
                      121 Kerk St, Rustenburg, 2999<br />
                      South Africa<br />
                      (Specific address available upon request)
                    </p>
                  </div>
                </div>

                <!-- Directions -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-green rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Directions</h3>
                    <p class="text-gray-600 mt-1">
                      From Nelspruit CBD: Head towards White River along R536. Turn right onto R40 towards Hazyview.
                      We are located in the central business district of Mbombela.
                    </p>
                  </div>
                </div>

                <!-- Public Transport -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-green rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Public Transport</h3>
                    <p class="text-gray-600 mt-1">
                      Bus services operate regularly from major areas in Mpumalanga.
                      Taxis are available from the central taxi rank.
                    </p>
                  </div>
                </div>

                <!-- Parking -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-primary-green rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Parking</h3>
                    <p class="text-gray-600 mt-1">
                      Free parking is available on-site for students and visitors.
                      Disabled parking spaces are available near the main entrance.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Area Information -->
              <div class="mt-12">
                <h3 class="text-xl font-medium text-gray-900 mb-4">About Mbombela</h3>
                <p class="text-gray-600 mb-4">
                  Mbombela (formerly Nelspruit) is the capital city of Mpumalanga province in northeastern South Africa.
                  Known as the "City of Knowledge," it's home to the University of Mpumalanga and numerous educational institutions.
                </p>
                <p class="text-gray-600">
                  Our beauty academy is centrally located, making it accessible to students from across the province
                  and neighboring countries.
                </p>
              </div>
            </div>

            <!-- Map Section -->
            <div>
              <h2 class="text-3xl font-bold text-gray-800 mb-8">Campus Location</h2>
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <p class="text-gray-500">Interactive Map - 121 Kerk St, Rustenburg, 2999, South Africa</p>
              </div>
              
              <div class="mt-8">
                <h3 class="text-xl font-medium text-gray-800 mb-4">Campus Features</h3>
                <ul class="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Modern training facilities with industry-standard equipment</li>
                  <li>Spacious classrooms and practical training areas</li>
                  <li>Well-equipped beauty studios and treatment rooms</li>
                  <li>Library and study areas</li>
                  <li>Student common areas and cafeteria</li>
                  <li>Free Wi-Fi throughout the campus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nearby Areas -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Areas We Serve</h2>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Rustenburg</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">White River</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Hazyview</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Barberton</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Nkomazi</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Bushbuckridge</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Ehlanzeni</h3>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-800">Other Regions</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Ready to Visit Our Campus?</h2>
          <p class="text-gray-600 mb-8">
            Schedule a tour of our facilities or attend an information session to learn more about our programs.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/application" class="bg-primary-green text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Apply Now
            </NuxtLink>
            <NuxtLink to="/contact" class="bg-white text-primary-green border border-primary-green hover:bg-gray-50 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Schedule Visit
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

// Set SEO meta for location page
setCustomSeoMeta({
  title: 'Beauty Academy Location | Mbombela, South Africa | BKN Beauty Academy',
  description: 'Find BKN Beauty Academy in Mbombela, South Africa. Visit our campus in the heart of Mpumalanga province for accredited beauty courses.',
  keywords: 'beauty academy location, mbombela beauty school, south africa beauty courses, beauty academy mpumalanga, beauty school location',
  ogTitle: 'Beauty Academy Location | Mbombela, South Africa | BKN Beauty Academy',
  ogDescription: 'Find BKN Beauty Academy in Mbombela, South Africa. Visit our campus in the heart of Mpumalanga province for accredited beauty courses.',
  ogImage: '/images/gallery/photos/gallery-04.jpg',
  twitterTitle: 'Beauty Academy Location | Mbombela, South Africa | BKN Beauty Academy',
  twitterDescription: 'Find BKN Beauty Academy in Mbombela, South Africa. Visit our campus in the heart of Mpumalanga province for accredited beauty courses.',
  twitterImage: '/images/gallery/photos/gallery-05.jpg'
});
</script>
