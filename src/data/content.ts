import { APP } from './app'

export const NAV = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#screenshots', label: 'Screenshots' },
  { href: '#platforms', label: 'Android and iOS' },
  { href: '#faq', label: 'FAQ' },
] as const

export const STEPS = [
  {
    title: 'Pick what you need',
    body: 'Choose from more than 200 categories, from doctors and lawyers to restaurants and home services. Search by voice if your hands are full.',
  },
  {
    title: 'Confirm your city',
    body: 'The app detects your city and state with GPS, or you can type one of 200+ cities across eight countries.',
  },
  {
    title: 'Choose from three',
    body: 'You get the top three verified businesses, with real customer reviews, so the decision takes minutes instead of an evening.',
  },
] as const

export const FEATURES = [
  {
    title: 'Three results, never thirty',
    body: 'No endless scrolling and no questionable listings. Each search ends with the top three providers in your area.',
  },
  {
    title: 'A 50-point inspection',
    body: 'Every business is evaluated on reputation, reviews, service quality and business standards before it earns a place.',
  },
  {
    title: 'Handpicked by trained analysts',
    body: 'People, not an algorithm alone, select each business. Listings are reviewed regularly so the information stays accurate.',
  },
  {
    title: 'Honest customer reviews',
    body: 'Read positive and negative feedback side by side, so you can choose with your eyes open.',
  },
  {
    title: '500,000+ verified businesses',
    body: 'One app covers the major cities in the United States, Canada, the United Kingdom, Australia, India, Singapore, Germany and France.',
  },
  {
    title: 'Free and ad-free',
    body: 'The app is free to use, with no hidden promotions. The inspection result decides who is listed.',
  },
  {
    title: 'In your language',
    body: 'Use the app in English, German, French or Hindi.',
  },
  {
    title: 'Transparent and private',
    body: 'ThreeBestRated operates with full transparency, strong data protection and strict compliance with advertising laws.',
  },
] as const

export const WHATS_NEW = [
  'GPS-based city and state detection',
  'Voice search',
  'Quick actions for Home, Categories and Recently viewed',
  'Recently viewed and recommended businesses',
  'Mapbox maps with multiple map styles',
  'Push notifications and deep links to Top Three and single-business screens',
  'In-app reviews',
  'TBR Assistant for business recommendations',
  'Faster, cleaner interface',
] as const

export const REVIEWS = [
  {
    quote: 'Excellent user friendly app. Accurate, non judgemental and essential data for all types of business are available.',
    name: 'S A Arabjan',
    store: 'Google Play',
    date: 'January 2026',
  },
  {
    quote: 'Super Helpful for Finding Top Local Services! Accurate and Honest Recommendations.',
    name: 'Santhos Chandrasekaran',
    store: 'App Store',
    date: 'June 2025',
  },
  {
    quote: "It's really helpful to find the best companies, restaurants, doctors and more.",
    name: 'Raihana Abdulla',
    store: 'Google Play',
    date: 'January 2022',
  },
] as const

export const FAQS = [
  {
    id: 'free',
    q: 'Is the ThreeBestRated app free?',
    a: 'Yes. The app is free to download and free to use on both Android and iPhone. It does not carry hidden promotions.',
  },
  {
    id: 'what',
    q: 'What does the ThreeBestRated app do?',
    a: `It shows you the top three local businesses and professionals in your city, such as doctors, lawyers and restaurants, instead of a long list of results. It has been selecting top-three businesses since ${APP.since}.`,
  },
  {
    id: 'choose',
    q: 'How does ThreeBestRated choose the top three?',
    a: `Trained analysts apply a 50-point inspection that includes ${APP.inspectionAreas.slice(0, -1).join(', ').toLowerCase()} and ${APP.inspectionAreas[APP.inspectionAreas.length - 1].toLowerCase()}. Only businesses that are verified by the team are shown.`,
  },
  {
    id: 'where',
    q: 'Which countries and cities does the app cover?',
    a: `The app covers more than 200 cities in ${APP.countries.length} countries: ${APP.countries.slice(0, -1).join(', ')} and ${APP.countries[APP.countries.length - 1]}. More than 500,000 verified businesses are listed.`,
  },
  {
    id: 'every-business',
    q: 'Does ThreeBestRated list every business in a city?',
    a: 'No. ThreeBestRated focuses on selected businesses rather than an exhaustive directory of every business in a category. Each search shows the top three.',
  },
  {
    id: 'categories',
    q: 'Can I find different types of local services in the app?',
    a: 'Yes. The app covers professionals, restaurants, healthcare providers and other local services. The options shown depend on your location and the category you select.',
  },
  {
    id: 'languages',
    q: 'Which languages are supported?',
    a: 'The Google Play listing says the app is available in English, German, French and Hindi. The App Store listing currently shows English.',
  },
  {
    id: 'download',
    q: 'How do I download the app on Android or iPhone?',
    a: 'On Android, open ThreeBestRated on Google Play and tap Install. On iPhone or iPad, open ThreeBestRated on the App Store and tap Get. The iPhone app needs iOS 15.0 or later.',
  },
  {
    id: 'privacy',
    q: 'What data does the app collect?',
    a: 'On Google Play, the developer states that no data is shared with third parties, that the app may collect app info and performance data, and that you can request deletion of your data. On the App Store, the developer states that no data is collected. Read the full privacy policy on the ThreeBestRated website for details.',
  },
  {
    id: 'pay',
    q: 'Can a business pay to be in the top three?',
    a: 'ThreeBestRated states that every listed business is handpicked by trained analysts after inspection, and that the service operates with full transparency and in compliance with advertising laws.',
  },
] as const
