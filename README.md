# ThreeBestRated download page

React 19 + Zustand + Vite, prerendered to static HTML at build time so search engines get the full page.

## Commands
- `npm install`
- `npm run dev` : local development
- `npm run assets` : turns `sourceAssets/` into responsive WebP in `public/screenshots/`, then regenerates the OG image, icons and QR codes
- `npm run build` : runs `assets`, builds, then prerenders `dist/index.html` and `dist/download/index.html`, plus `sitemap.xml` and `robots.txt`
- `VITE_SITE_URL=https://your-domain.com npm run build` : sets canonical, Open Graph and sitemap URLs

## Where things live
- `src/data/app.ts` : store URLs, ratings, specs, stats (single source of truth, also feeds the JSON-LD)
- `src/data/content.ts` : copy for steps, features, reviews, FAQ
- `src/store/` : Zustand store split into slices (platform, compare, gallery, faq, ui, analytics) with selectors and hooks
- `src/seo/` : meta tags and schema.org JSON-LD (MobileApplication, Organization, WebPage, BreadcrumbList, FAQPage)
- `scripts/optimize-screenshots.mjs` : `sourceAssets/mobile` -> `public/screenshots/phone`, `sourceAssets/tab` -> `public/screenshots/tablet` (4 widths each)
- `scripts/` : asset generation and prerender (also writes an image sitemap)
- `src/components/Podium.tsx` : hero (three real screens on a podium, rising 3, 2, 1)
- `src/components/Screenshots.tsx` : device switcher (iPhone, Android phone, iPad, Android tablet) and swipeable gallery

## Before launch
- Set `VITE_SITE_URL` to the real domain.
- Screenshots are self-hosted with descriptive alt text. If you update them, keep the numbering 1.png to 6.png in `sourceAssets/mobile` and `sourceAssets/tab`, update the matching `alt` text in `src/data/app.ts`, and run `npm run assets`.
- iPhone and Android phone currently share one image set, and iPad and Android tablet share another. To give iPhone its own App Store images, add a third set in `src/data/app.ts` and point `DEVICES.iphone.set` at it.
- Swap the CSS store buttons for the official Google Play and App Store badges if brand guidelines require it.
- Serve `/download` from `dist/download/index.html` with long-cache headers on `/assets/*`.
