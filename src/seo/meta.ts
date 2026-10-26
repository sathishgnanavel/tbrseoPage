import { APP, PAGE_URL, PODIUM_SIZES, SCREENSHOT_SETS, SITE_URL, STORES, shotSrcSet, shotUrl } from '../data/app'

export const SEO = {
  title: 'ThreeBestRated App Download: Top 3 Local Businesses Near You',
  description:
    'Download the free ThreeBestRated app for iPhone, iPad and Android phones and tablets. See the top 3 verified local businesses in 200+ cities across 8 countries.',
  keywords:
    'ThreeBestRated app, download ThreeBestRated, ThreeBestRated iPhone app, ThreeBestRated iPad app, ThreeBestRated Android app, top 3 local businesses, best local services near me, best rated doctors near me, best lawyers near me, local business finder app',
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageAlt: 'ThreeBestRated app on a phone: only the top three local businesses near you',
  themeColor: '#112142',
  iosAppId: '1445667019',
}

export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap'

const heroShot = SCREENSHOT_SETS.phone[1].n

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Everything that belongs inside <head>, rendered to a string at build time. */
export function buildHeadHtml(jsonLd: object): string {
  const t = (name: string, content: string) => `<meta name="${name}" content="${esc(content)}" />`
  const p = (property: string, content: string) => `<meta property="${property}" content="${esc(content)}" />`
  const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

  return [
    `<title>${esc(SEO.title)}</title>`,
    t('description', SEO.description),
    t('keywords', SEO.keywords),
    t('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    t('author', APP.name),
    t('theme-color', SEO.themeColor),
    t('apple-itunes-app', `app-id=${SEO.iosAppId}`),
    t('application-name', APP.name),
    t('apple-mobile-web-app-title', APP.name),
    `<link rel="canonical" href="${PAGE_URL}" />`,
    `<link rel="alternate" hreflang="en" href="${PAGE_URL}" />`,
    `<link rel="alternate" hreflang="x-default" href="${PAGE_URL}" />`,
    p('og:type', 'website'),
    p('og:site_name', APP.name),
    p('og:locale', 'en_US'),
    p('og:title', SEO.title),
    p('og:description', SEO.description),
    p('og:url', PAGE_URL),
    p('og:image', SEO.ogImage),
    p('og:image:width', '1200'),
    p('og:image:height', '630'),
    p('og:image:alt', SEO.ogImageAlt),
    t('twitter:card', 'summary_large_image'),
    t('twitter:title', SEO.title),
    t('twitter:description', SEO.description),
    t('twitter:image', SEO.ogImage),
    t('twitter:image:alt', SEO.ogImageAlt),
    // Deep-link metadata so shared links can open the installed app.
    t('twitter:app:name:iphone', APP.name),
    t('twitter:app:id:iphone', SEO.iosAppId),
    t('twitter:app:name:googleplay', APP.name),
    t('twitter:app:id:googleplay', 'com.allcountries.threebestrated'),
    `<link rel="icon" href="/stars.png?v=2" type="image/png" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    // The hero's centre screenshot is the likely largest contentful paint, so fetch it before the CSS finishes.
    `<link rel="preload" as="image" type="image/webp" imagesrcset="${esc(shotSrcSet('phone', heroShot))}" imagesizes="${esc(PODIUM_SIZES)}" fetchpriority="high" />`,
    `<link rel="stylesheet" href="${esc(FONT_HREF)}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}

export { STORES, shotUrl }
