import { ALL_SCREENSHOTS, APP, COMBINED_RATING, PAGE_URL, SHOT, SITE_URL, STORES } from '../data/app'
import { FAQS } from '../data/content'
import { SEO } from './meta'

/** One connected @graph: Organization, WebSite, WebPage, BreadcrumbList, the app itself and the FAQ. */
export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`
  const appId = `${PAGE_URL}#app`
  const pageId = `${PAGE_URL}#webpage`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: APP.name,
        legalName: APP.developer,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
        sameAs: APP.social.map((s) => s.url),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: APP.supportEmail,
            telephone: APP.phone,
            availableLanguage: [...APP.languages],
          },
          { '@type': 'ContactPoint', contactType: 'press', email: APP.pressEmail },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '311 Ranch Road 620 S Ste 211',
          addressLocality: 'Lakeway',
          addressRegion: 'TX',
          postalCode: '78734-4776',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: APP.name,
        publisher: { '@id': orgId },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: PAGE_URL,
        name: SEO.title,
        description: SEO.description,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: { '@type': 'ImageObject', url: SEO.ogImage },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
        mainEntity: { '@id': appId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Download the app', item: PAGE_URL },
        ],
      },
      {
        '@type': 'MobileApplication',
        '@id': appId,
        name: APP.fullName,
        alternateName: APP.name,
        description: SEO.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, iOS',
        url: PAGE_URL,
        image: `${APP.iconUrl}=w512-h512`,
        screenshot: ALL_SCREENSHOTS.map((s) => ({
          '@type': 'ImageObject',
          contentUrl: s.url,
          url: s.url,
          caption: s.alt,
          name: s.caption,
          encodingFormat: 'image/webp',
          width: SHOT.width,
          height: SHOT.height,
        })),
        availableOnDevice: ['iPhone', 'iPad', 'Android phones', 'Android tablets'],
        isAccessibleForFree: true,
        featureList: [
          'Top three selected local businesses in every category',
          '50-Point Inspection covering reputation, history, complaints, ratings, proximity, satisfaction, trust, cost, reviews and excellence',
          'AI assistant that matches a problem to the top three businesses',
          'Voice search',
          'Honest customer reviews',
          'GPS-based city detection across 200+ cities in 8 countries',
        ],
        downloadUrl: [STORES.android.url, STORES.ios.url],
        installUrl: STORES.android.url,
        softwareVersion: '12.0.2',
        inLanguage: [...APP.languages],
        author: { '@id': orgId },
        publisher: { '@id': orgId },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: COMBINED_RATING.value,
          ratingCount: COMBINED_RATING.count,
          bestRating: 5,
          worstRating: 1,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}
