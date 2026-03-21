<template>
  <div class="flex flex-col min-h-screen bg-light-beige dark:bg-bg-dark text-text-dark dark:text-text-dark-alt">
    <header>
      <Navigation />
    </header>

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
// Import global components
import Navigation from '~/components/ui/Navigation.vue';
import Footer from '~/components/ui/Footer.vue';

// Import SEO composable
import { setCustomSeoMeta } from '~/composables/useSeoMeta';

// Define organization schema for the beauty academy
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "BKN Beauty Academy",
  "alternateName": "Beauty Academy",
  "description": "Accredited beauty courses and professional training in South Africa. Join us for certified beauty education and career development.",
  "url": "https://www.beautyacademy.co.za",
  "logo": "/images/logo.png", // Updated to use the new logo image from images folder
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ZA"
  },
  "email": "nthabi@bknbeautyacademy.co.za",
  "telephone": "+27 63 842 9997",
  "areaServed": "South Africa",
  "knowsAbout": ["beauty courses", "cosmetology", "esthetician training", "nail technology", "makeup artistry"],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Accredited Beauty Certificate"
  },
  "founder": {
    "@type": "Person",
    "name": "Nthabiseng J. Seerane",
    "jobTitle": "Managing Director/Facilitator"
  },
  "offers": {
    "@type": "OfferCatalog",
    "name": "Beauty Courses",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Cosmetology Course"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Makeup Artistry Course"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Nail Technician Course"
        }
      }
    ]
  }
};

// Global metadata
useHead({
  titleTemplate: '%s - BKN Beauty Academy',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Beauty Academy - Crafting careers in beauty through quality education and training' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema)
    }
  ]
});

// Set default SEO meta for the homepage
setCustomSeoMeta({
  title: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
  description: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more. Enroll today!',
  keywords: 'beauty academy, beauty courses, beauty school, south africa, accredited courses, cosmetology, makeup artistry, nail technician, esthetician, beauty training',
  ogTitle: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
  ogDescription: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more.',
  ogImage: '/images/og-image.jpg', // Placeholder - will need actual image
  twitterTitle: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
  twitterDescription: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more.',
  twitterImage: '/images/twitter-card.jpg' // Placeholder - will need actual image
});
</script>
