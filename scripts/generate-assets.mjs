// Generates the OG image, app icons, web manifest and QR codes into /public.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import QRCode from 'qrcode'

const out = path.resolve('public')
fs.mkdirSync(out, { recursive: true })

const mark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="15" fill="#22397A"/>
  <rect x="9" y="30" width="14" height="22" rx="3" fill="#C5D0D4"/>
  <rect x="25" y="14" width="14" height="38" rx="3" fill="#F2B632"/>
  <rect x="41" y="38" width="14" height="14" rx="3" fill="#C9824F"/>
</svg>`

fs.writeFileSync(path.join(out, 'favicon.svg'), mark(64))
await sharp(Buffer.from(mark(512))).png().toFile(path.join(out, 'icon-512.png'))
await sharp(Buffer.from(mark(180))).png().toFile(path.join(out, 'apple-touch-icon.png'))

// ---- Open Graph image: headline on the left, three real app screens on a podium on the right ----
const W = 1200
const H = 630
const BASE = 596 // bottom edge of the podium steps
const gap = 18
// rank, source screenshot number, card height, step height, step colour
const places = [
  { rank: 2, file: 3, h: 310, step: 30, color: '#C5D0D4' },
  { rank: 1, file: 2, h: 388, step: 42, color: '#F2B632' },
  { rank: 3, file: 1, h: 276, step: 24, color: '#C9824F' },
].map((p) => ({ ...p, w: Math.round((p.h * 9) / 16) }))
// lay the three cards out left to right, right-aligned to a 70px margin
let cursor = W - 70 - (places.reduce((n, p) => n + p.w, 0) + gap * 2)
for (const p of places) {
  p.x = cursor
  cursor += p.w + gap
}

const roundedMask = (w, h, r) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" fill="#fff"/></svg>`)

const composites = []
const shotDir = path.resolve('sourceAssets/mobile')
for (const p of places) {
  const file = path.join(shotDir, `${p.file}.png`)
  if (!fs.existsSync(file)) continue
  const card = await sharp(file)
    .resize(p.w, p.h, { fit: 'cover', position: 'top' })
    .composite([{ input: roundedMask(p.w, p.h, 20), blend: 'dest-in' }])
    .png()
    .toBuffer()
  composites.push({ input: card, left: p.x, top: BASE - p.step - 10 - p.h })
}

const steps = places
  .map(
    (p) => `<g>
      <path d="M${p.x} ${BASE} v-${p.step - 10} a10 10 0 0 1 10 -10 h${p.w - 20} a10 10 0 0 1 10 10 v${p.step - 10} z" fill="${p.color}"/>
      <text x="${p.x + p.w / 2}" y="${BASE - p.step / 2 + 9}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${p.rank === 1 ? 26 : 22}" fill="#112142">${p.rank}</text>
    </g>`,
  )
  .join('\n')

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="45%" r="55%"><stop offset="0" stop-color="#34549F" stop-opacity=".6"/><stop offset="1" stop-color="#34549F" stop-opacity="0"/></radialGradient>
    <radialGradient id="gold" cx="82%" cy="55%" r="30%"><stop offset="0" stop-color="#F2B632" stop-opacity=".22"/><stop offset="1" stop-color="#F2B632" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#112142"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#gold)"/>
  <g transform="translate(72 64)">
    <rect width="64" height="64" rx="15" fill="#22397A"/>
    <rect x="9" y="30" width="14" height="22" rx="3" fill="#C5D0D4"/>
    <rect x="25" y="14" width="14" height="38" rx="3" fill="#F2B632"/>
    <rect x="41" y="38" width="14" height="14" rx="3" fill="#C9824F"/>
    <text x="80" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="34" fill="#fff">ThreeBestRated</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="-2">
    <text x="72" y="272" font-size="54" fill="#fff">Only the top 3</text>
    <text x="72" y="338" font-size="54" fill="#F2B632">local businesses</text>
    <text x="72" y="404" font-size="54" fill="#fff">near you</text>
  </g>
  <text x="72" y="462" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#AEBBD9">Free for iPhone, iPad and Android</text>
  <g>${steps}</g>
</svg>`
await sharp(Buffer.from(og))
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(path.join(out, 'og-image.png'))

fs.writeFileSync(
  path.join(out, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'ThreeBestRated',
      short_name: 'ThreeBestRated',
      description: 'The top three local businesses near you.',
      start_url: '/download',
      display: 'browser',
      background_color: '#112142',
      theme_color: '#112142',
      icons: [
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
)

const qr = { android: 'https://play.google.com/store/apps/details?id=com.allcountries.threebestrated', ios: 'https://apps.apple.com/in/app/threebestrated/id1445667019' }
for (const [k, url] of Object.entries(qr)) {
  const svg = await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#112142', light: '#FFFFFF' } })
  fs.writeFileSync(path.join(out, `qr-${k}.svg`), svg)
}
console.log('assets generated')
