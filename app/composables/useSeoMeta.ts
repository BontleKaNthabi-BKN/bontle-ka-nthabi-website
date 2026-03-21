/**
 * Composable for managing SEO meta tags across the beauty academy website
 */

interface SeoMetaParams {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export const setCustomSeoMeta = (params: SeoMetaParams = {}) => {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical
  } = params;

  // Set basic meta tags
  if (title) {
    useHead({
      title: title,
      meta: [{ property: 'og:title', content: title }]
    });
  }

  if (description) {
    useHead({
      meta: [
        { name: 'description', content: description },
        { property: 'og:description', content: description },
        { name: 'twitter:description', content: description }
      ]
    });
  }

  if (keywords) {
    useHead({
      meta: [{ name: 'keywords', content: keywords }]
    });
  }

  // Set Open Graph tags
  if (ogTitle) {
    useHead({
      meta: [{ property: 'og:title', content: ogTitle }]
    });
  }

  if (ogDescription) {
    useHead({
      meta: [{ property: 'og:description', content: ogDescription }]
    });
  }

  if (ogImage) {
    useHead({
      meta: [
        { property: 'og:image', content: ogImage },
        { name: 'twitter:image', content: ogImage }
      ]
    });
  }

  // Set Twitter Card tags
  if (twitterTitle) {
    useHead({
      meta: [{ name: 'twitter:title', content: twitterTitle }]
    });
  }

  if (twitterDescription) {
    useHead({
      meta: [{ name: 'twitter:description', content: twitterDescription }]
    });
  }

  if (twitterImage) {
    useHead({
      meta: [{ name: 'twitter:image', content: twitterImage }]
    });
  }

  // Set canonical URL
  if (canonical) {
    useHead({
      link: [{ rel: 'canonical', href: canonical }]
    });
  }

  // Set default values if not provided
  if (!title) {
    useHead({
      title: 'BKN Beauty Academy | Accredited Beauty Courses in South Africa'
    });
  }

  if (!description) {
    useHead({
      meta: [{
        name: 'description',
        content: 'Join BKN Beauty Academy for accredited beauty courses in South Africa. Professional training in makeup, nails, skincare & more. Enroll today!'
      }]
    });
  }
};