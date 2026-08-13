/**
 * optimize-images.mjs — turns full-size source art into the two web variants
 * this app actually serves.
 *
 * Usage:  node scripts/optimize-images.mjs <srcDir> <outPrefix>
 * e.g.    node scripts/optimize-images.mjs "art-source/card_carousal" card
 *         -> public/assets/card-1.webp        (1600px, the served original)
 *            public/assets/card-1@1000.jpg    (1000px, the phone variant)
 *
 * Full-size source art belongs in art-source/, NOT in public/. Everything under
 * public/ is copied verbatim into dist/ on every build, so a folder of 9MB
 * originals ships to production untouched — 63MB of it, for files the site
 * never requests, on top of the 2.7MB it actually serves.
 *
 * ── Why 1600, and why a second file at all ──────────────────────────────────
 *
 * The source art here is 4750x4750 PNG at ~9MB each. Nothing on this site ever
 * displays an image wider than about 620 CSS px, so even at DPR 2 a 1600px
 * original is already oversampled — the remaining 3150px of width is pure
 * download and decode cost for pixels the screen cannot resolve.
 *
 * The phone variant is a separate file rather than a `srcset` width because
 * srcset picks by computed CSS width: at DPR 3 a 390px phone asks for ~1170px
 * and would take the 1600px original anyway, which is the opposite of what is
 * wanted. The saving that matters on a phone is pixels DECODED — 1.0MP against
 * 2.56MP — so `mobileSrc()` pairs this with a `<picture>` media condition
 * instead. See src/utils/mobileSrc.js.
 *
 * JPEG for that variant, not WebP: the container costs a few bytes over WebP
 * and buys back decode time, which is the whole point of the variant.
 *
 * Quality 92 is deliberately high. These are document mockups with fine gold
 * rules and small serif text, and WebP's chroma handling smears exactly that
 * kind of detail at the usual 75-80. File size is a secondary concern for
 * artwork that is the content of its section.
 *
 * Run scripts/gen-mobile-variants.mjs afterwards so the @1000 allow-list picks
 * up the new files — without that, mobileSrc() will not emit the <source> and
 * phones quietly keep downloading the full-size original.
 */
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [srcDir, outPrefix] = process.argv.slice(2);

if (!srcDir || !outPrefix) {
  console.error('usage: node scripts/optimize-images.mjs <srcDir> <outPrefix>');
  process.exit(1);
}

const OUT_DIR = 'public/assets';
const FULL_WIDTH = 1600;
const MOBILE_WIDTH = 1000;

// Natural sort on the leading number so "10.png" lands after "9.png", and so
// duplicate-download names like "1 (2).png" still sort by the 1.
const leadingNumber = (name) => {
  const m = name.match(/\d+/);
  return m ? Number(m[0]) : Number.MAX_SAFE_INTEGER;
};

const sources = readdirSync(srcDir)
  .filter((f) => /\.(png|jpe?g|webp|tiff?)$/i.test(f))
  .sort((a, b) => leadingNumber(a) - leadingNumber(b) || a.localeCompare(b));

if (!sources.length) {
  console.error(`no images found in ${srcDir}`);
  process.exit(1);
}

const mb = (bytes) => (bytes / 1048576).toFixed(2);

for (const [i, file] of sources.entries()) {
  const from = path.join(srcDir, file);
  const stem = `${outPrefix}-${i + 1}`;
  const webp = path.join(OUT_DIR, `${stem}.webp`);
  const jpg = path.join(OUT_DIR, `${stem}@1000.jpg`);

  await sharp(from)
    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toFile(webp);

  await sharp(from)
    .resize({ width: MOBILE_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(jpg);

  console.log(
    `${file}  ${mb(statSync(from).size)}MB` +
      `  ->  ${stem}.webp ${mb(statSync(webp).size)}MB` +
      `  +  ${stem}@1000.jpg ${mb(statSync(jpg).size)}MB`
  );
}

console.log(`\n${sources.length} images written to ${OUT_DIR}/${outPrefix}-*`);
console.log('next: node scripts/gen-mobile-variants.mjs');
