// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    '@nuxtjs/color-mode'
  ],
  runtimeConfig: {
    // Private config that only the server can access
    recaptchaSecretKey: process.env.NUXT_RECAPTCHA_SECRET_KEY || '',
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: process.env.SMTP_PORT || 587,
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpSecure: process.env.SMTP_SECURE || 'false',
    googleDriveClientId: process.env.GOOGLE_DRIVE_CLIENT_ID || '',
    googleDriveClientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET || '',
    googleDriveRedirectUri: process.env.GOOGLE_DRIVE_REDIRECT_URI || '',
    googleDriveRefreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',

    // Public config that is exposed to the client
    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bknbeautyacademy.co.za'
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  typescript: {
    shim: false
  },
  tailwindcss: {
    viewer: false
  },
  // SEO Configuration
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bknbeautyacademy.co.za',
    name: 'BKN Beauty Academy',
    description: 'Accredited beauty courses and professional training in South Africa. Join us for certified beauty education and career development.',
  },
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bknbeautyacademy.co.za',
    gzip: true,
    routes: [
      '/',
      '/about',
      '/courses',
      '/services',
      '/gallery',
      '/admissions',
      '/application',
      '/enquiry',
      '/contact'
    ]
  },
  robots: {
    rules: {
      UserAgent: '*',
      Disallow: []
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more. Enroll today!'
        },
        { name: 'keywords', content: 'beauty academy, beauty courses, beauty school, south africa, accredited courses, cosmetology, makeup artistry, nail technician, esthetician, beauty training' },
        { name: 'author', content: 'BKN Beauty Academy' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bknbeautyacademy.co.za' },
        { property: 'og:title', content: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa' },
        {
          property: 'og:description',
          content: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more.'
        },
        { property: 'og:image', content: '/images/og-image.jpg' }, // Placeholder - will need actual image

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bknbeautyacademy.co.za' },
        { name: 'twitter:title', content: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa' },
        {
          name: 'twitter:description',
          content: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more.'
        },
        { name: 'twitter:image', content: '/images/twitter-card.jpg' } // Placeholder - will need actual image
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bknbeautyacademy.co.za' }
      ],
      script: [
        // Load reCAPTCHA script
        {
          src: 'https://www.google.com/recaptcha/api.js?render=' + (process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
          async: true,
          defer: true
        }
      ]
    }
  }
})