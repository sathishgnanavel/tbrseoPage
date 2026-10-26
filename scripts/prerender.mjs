// Renders the React app to static HTML (so crawlers see full content), then writes sitemap and robots.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const site = (process.env.VITE_SITE_URL || 'https://threebestrated.com').replace(/\/$/, '')
const dist = path.resolve('dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, sitemapImages } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href)

const { html, head } = render()
if (!template.includes('<!--head-tags-->') || !template.includes('<!--app-html-->')) {
  throw new Error('Template placeholders missing in dist/index.html')
}
const page = template.replace('<!--head-tags-->', head).replace('<!--app-html-->', html)

fs.writeFileSync(path.join(dist, 'index.html'), page)
fs.mkdirSync(path.join(dist, 'download'), { recursive: true })
fs.writeFileSync(path.join(dist, 'download', 'index.html'), page)

const today = new Date().toISOString().slice(0, 10)
const xml = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// Image sitemap: helps Google Images find every screenshot, with captions.
const images = sitemapImages()
  .map(
    (i) =>
      `    <image:image>\n      <image:loc>${xml(i.loc)}</image:loc>\n      <image:title>${xml(i.title)}</image:title>\n      <image:caption>${xml(i.caption)}</image:caption>\n    </image:image>`,
  )
  .join('\n')
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${site}/download</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n${images}\n  </url>\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
console.log(`prerendered ${(page.length / 1024).toFixed(1)} KB -> dist/index.html, dist/download/index.html`)
