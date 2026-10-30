// Turns the store graphics in /sourceAssets into responsive WebP files in /public/screenshots.
//   sourceAssets/mobile/1..6.png -> public/screenshots/phone/1-360.webp ... 1-1125.webp
//   sourceAssets/tab/1..6.png    -> public/screenshots/tablet/1-360.webp ... 1-1125.webp
// Add or replace PNGs in sourceAssets, then run `npm run assets`.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

export const WIDTHS = [360, 540, 810, 1125]
const SETS = [
  { src: 'sourceAssets/mobile', out: 'phone' },
  { src: 'sourceAssets/tab', out: 'tablet' },
]

let total = 0

for (const set of SETS) {
  const srcDir = path.resolve(set.src)
  if (!fs.existsSync(srcDir)) {
    console.warn(`skipped ${set.src}: folder not found`)
    continue
  }
  const outDir = path.resolve('public/screenshots', set.out)
  fs.mkdirSync(outDir, { recursive: true })

  const files = fs.readdirSync(srcDir).filter((f) => /^\d+\.png$/i.test(f))
  for (const file of files) {
    const n = parseInt(file, 10)
    for (const w of WIDTHS) {
      const target = path.join(outDir, `${n}-${w}.webp`)
      const info = await sharp(path.join(srcDir, file))
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: w >= 810 ? 80 : 76, effort: 5 })
        .toFile(target)
      total += info.size
    }
  }
  console.log(`${set.out}: ${files.length} screens x ${WIDTHS.length} sizes`)
}
console.log(`screenshots written (${(total / 1024 / 1024).toFixed(1)} MB total)`)
