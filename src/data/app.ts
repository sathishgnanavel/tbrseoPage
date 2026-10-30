/**
 * Single source of truth for every fact shown on the page and in the schema.org markup.
 * Values come from the Google Play and Apple App Store listings (checked 15 Oct 2026).
 */
export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? 'https://threebestrated.com'
export const PAGE_PATH = '/download'
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

export const APP = {
  name: 'ThreeBestRated',
  fullName: 'ThreeBestRated: local experts',
  developer: 'Signature Profit LLC',
  website: 'https://threebestrated.com',
  privacyUrl: 'https://threebestrated.com/privacy-policy',
  supportEmail: 'support@threebestrated.com',
  pressEmail: 'press@threebestrated.com',
  termsUrl: 'https://threebestrated.com/terms-of-service', // confirm this URL
  phone: '+1 888-551-1667',
  address: '311 Ranch Road 620 S Ste 211, Lakeway, TX 78734-4776, United States',
  since: 2014,
  stats: {
    monthlyUsers: '5M+',
    businesses: '500,000+',
    cities: '200+',
    categories: '200+',
    countries: 8,
  },
  countries: [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
    'Singapore',
    'Germany',
    'France',
  ],
  languages: ['English', 'German', 'French', 'Hindi'],
  inspectionAreas: [
    'Reputation',
    'History',
    'Complaints',
    'Ratings',
    'Proximity',
    'Satisfaction',
    'Trust',
    'Cost',
    'Reviews',
    'Excellence',
  ],
  iconUrl:
    'https://play-lh.googleusercontent.com/vPucNwPbS2uPd1JeCLVdJbSvdYX6Fr1zd3A8A964JWxe3iZh4JngCsn7QjiXPLDJNe0N7bitt6Axq6oH_sUszA',
} as const

export type StoreId = 'android' | 'ios'

export interface StoreListing {
  id: StoreId
  label: string
  storeName: string
  url: string
  rating: number
  ratingCount: number
  ratingNoun: string
  specs: ReadonlyArray<{ label: string; value: string }>
}

export const STORES: Record<StoreId, StoreListing> = {
  android: {
    id: 'android',
    label: 'Android',
    storeName: 'Google Play',
    url: 'https://play.google.com/store/apps/details?id=com.allcountries.threebestrated',
    rating: 4.5,
    ratingCount: 117,
    ratingNoun: 'reviews',
    specs: [
      { label: 'Rating', value: '4.5 out of 5 from 117 reviews' },
      { label: 'Downloads', value: '10K+' },
      { label: 'Category', value: 'Business' },
      { label: 'Content rating', value: 'Rated for 3+' },
      { label: 'Last updated', value: 'Oct 14, 2026' },
      { label: 'Languages', value: 'English, German, French, Hindi' },
      { label: 'Data safety', value: 'No data shared with third parties. You can request that data be deleted.' },
    ],
  },
  ios: {
    id: 'ios',
    label: 'iPhone and iPad',
    storeName: 'App Store',
    url: 'https://apps.apple.com/in/app/threebestrated/id1445667019',
    rating: 4.3,
    ratingCount: 6,
    ratingNoun: 'ratings',
    specs: [
      { label: 'Rating', value: '4.3 out of 5 from 6 ratings' },
      { label: 'Price', value: 'Free' },
      { label: 'Category', value: 'Business' },
      { label: 'Version', value: '12.0.2' },
      { label: 'Size', value: '68.6 MB' },
      { label: 'Requires', value: 'iOS 15.0 or later, iPadOS 15.0 or later' },
      { label: 'Age rating', value: '16+ (unrestricted web access)' },
      { label: 'App privacy', value: 'The developer reports that no data is collected.' },
    ],
  },
}

/** Weighted average across both stores, used for the schema.org aggregateRating. */
export const COMBINED_RATING = (() => {
  const all = Object.values(STORES)
  const count = all.reduce((n, s) => n + s.ratingCount, 0)
  const value = all.reduce((n, s) => n + s.rating * s.ratingCount, 0) / count
  return { value: Math.round(value * 10) / 10, count }
})()

/* ------------------------------------------------------------------ */
/* Screenshots and devices                                             */
/* ------------------------------------------------------------------ */

/**
 * Two image sets, generated from /sourceAssets by `npm run assets`:
 *   phone  <- sourceAssets/mobile  (shown for iPhone and Android phone)
 *   tablet <- sourceAssets/tab     (shown for iPad and Android tablet)
 * To give iPhone its own App Store images later, add a third set and point `set` below at it.
 */
export type ScreenshotSet = 'phone' | 'tablet'
export type DeviceId = 'iphone' | 'android-phone' | 'ipad' | 'android-tablet'

export const SHOT = { width: 1125, height: 2000, sizes: [360, 540, 810, 1125] as const }

export interface Screenshot {
  n: number
  /** The headline printed on the graphic, kept here so it is also available as text. */
  caption: string
  alt: string
}

export const SCREENSHOT_SETS: Record<ScreenshotSet, ReadonlyArray<Screenshot>> = {
  phone: [
    {
      n: 1,
      caption: '200+ local categories. One trusted app.',
      alt: 'ThreeBestRated on a phone: the Our Categories grid with Doctors, Entertainment, Health, Lawyers, Local Businesses, Local Services, Professional Services, Restaurants and Specialty Cuisine',
    },
    {
      n: 2,
      caption: 'Only the best 3 local businesses make the list.',
      alt: 'ThreeBestRated on a phone: the 3 best local plumbers in New York City, each with a rating, years in business and Call and Direction buttons',
    },
    {
      n: 3,
      caption: 'Ask our AI assistant. Get instant answers.',
      alt: 'ThreeBestRated on a phone: the TBR Assistant chat answering "my car does not start" with a View Top 3 button for car repair shops in New York City',
    },
    {
      n: 4,
      caption: 'Voice search for nearby services.',
      alt: 'ThreeBestRated on a phone: voice search listening for a category name while the user says "I need amusement parks"',
    },
    {
      n: 5,
      caption: 'All the details you need in one place.',
      alt: 'ThreeBestRated on a phone: a business page for Roto-Rooter Plumbing and Water Cleanup with a 4.9 score, license numbers, an about section and Call and Direction buttons',
    },
    {
      n: 6,
      caption: 'Handpicked by a 50-point inspection.',
      alt: 'ThreeBestRated on a phone: the United States home screen with an Explore Categories button and a Recently Viewed list',
    },
  ],
  tablet: [
    {
      n: 1,
      caption: '200+ local categories. One trusted app.',
      alt: 'ThreeBestRated on a tablet: the Our Categories grid with Doctors, Entertainment, Health, Lawyers, Local Businesses, Local Services, Professional Services, Restaurants and Specialty Cuisine',
    },
    {
      n: 2,
      caption: 'Only the best 3 local businesses make the list.',
      alt: 'ThreeBestRated on a tablet: the 3 best local plumbers in New York City, each with a rating, years in business and Call and Direction buttons',
    },
    {
      n: 3,
      caption: 'Ask our AI assistant. Get instant answers.',
      alt: 'ThreeBestRated on a tablet: the TBR Assistant chat with quick suggestions and a View Top 3 button for car repair shops in New York City',
    },
    {
      n: 4,
      caption: 'Voice search for nearby services.',
      alt: 'ThreeBestRated on a tablet: voice search listening for a category name while the user says "I have severe fever"',
    },
    {
      n: 5,
      caption: 'All the details you need in one place.',
      alt: 'ThreeBestRated on a tablet: a business page for A Good Plumber Inc. with a 4.8 score, license numbers, an about section and Call and Direction buttons',
    },
    {
      n: 6,
      caption: 'Handpicked by a 50-point inspection.',
      alt: 'ThreeBestRated on a tablet: the United States home screen with an Explore Categories button and the AI assistant prompt',
    },
  ],
}

export interface Device {
  id: DeviceId
  label: string
  kind: 'phone' | 'tablet'
  set: ScreenshotSet
  store: StoreId
  /** One factual line shown under the gallery, taken from the store listings. */
  note: string
}
/** Windows/Android/Linux → Play Store, Mac/iPhone/iPad → App Store. Returns null if unknown. */
export function detectStoreFromDevice(): StoreId | null {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(ua)) return 'ios'
  if (/Android|Windows|Linux|CrOS/i.test(ua)) return 'android'
  return null
}
export const DEVICES: Record<DeviceId, Device> = {
  iphone: {
    id: 'iphone',
    label: 'iPhone',
    kind: 'phone',
    set: 'phone',
    store: 'ios',
    note: 'Free on the App Store. Needs iOS 15.0 or later.',
  },
  'android-phone': {
    id: 'android-phone',
    label: 'Android phone',
    kind: 'phone',
    set: 'phone',
    store: 'android',
    note: `Free on Google Play. Rated ${STORES.android.rating} from ${STORES.android.ratingCount} reviews.`,
  },
  ipad: {
    id: 'ipad',
    label: 'iPad',
    kind: 'tablet',
    set: 'tablet',
    store: 'ios',
    note: 'The same App Store app runs on iPad. Needs iPadOS 15.0 or later.',
  },
  'android-tablet': {
    id: 'android-tablet',
    label: 'Android tablet',
    kind: 'tablet',
    set: 'tablet',
    store: 'android',
    note: 'The Google Play listing includes tablet screenshots, so the layout fits larger screens.',
  },
}

export const DEVICE_ORDER: DeviceId[] = ['iphone', 'android-phone', 'ipad', 'android-tablet']

/** `sizes` for the hero podium. Shared with the <link rel="preload"> so the browser downloads the file once. */
export const PODIUM_SIZES = '(min-width: 961px) 220px, 38vw'

export const shotUrl = (set: ScreenshotSet, n: number, width: number = SHOT.sizes[SHOT.sizes.length - 1]) =>
  `/screenshots/${set}/${n}-${width}.webp`

export const shotSrcSet = (set: ScreenshotSet, n: number) =>
  SHOT.sizes.map((w) => `${shotUrl(set, n, w)} ${w}w`).join(', ')

/** Absolute URLs of every full-size screenshot, for the schema.org markup and the image sitemap. */
export const ALL_SCREENSHOTS = (Object.keys(SCREENSHOT_SETS) as ScreenshotSet[]).flatMap((set) =>
  SCREENSHOT_SETS[set].map((s) => ({ ...s, set, url: `${SITE_URL}${shotUrl(set, s.n)}` })),
)
