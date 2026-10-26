import { renderToString } from 'react-dom/server'
import App from './App'
import { ALL_SCREENSHOTS } from './data/app'
import { buildHeadHtml } from './seo/meta'
import { buildJsonLd } from './seo/schema'

export function render() {
  return { html: renderToString(<App />), head: buildHeadHtml(buildJsonLd()) }
}

/** Feeds the image sitemap written by scripts/prerender.mjs. */
export function sitemapImages() {
  return ALL_SCREENSHOTS.map((s) => ({ loc: s.url, caption: s.alt, title: s.caption }))
}
