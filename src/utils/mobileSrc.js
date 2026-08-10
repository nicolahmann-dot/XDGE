import { MOBILE_VARIANTS } from './mobileVariants';

/**
 * mobileSrc — the 1000px variant path for an asset, or null if there isn't one.
 *
 * `/assets/foo.webp` -> `/assets/foo@1000.jpg`, but ONLY when that file exists.
 *
 * Pair it with a `<picture>` media condition rather than `srcset`: at DPR 3 a 390px
 * phone computes a need of ~1170px and picks the 1600px original anyway, which is the
 * opposite of what is wanted. The saving is in pixels decoded — 1.0MP against 2.56MP —
 * which is the expensive part on a phone, so the JPEG container costs a few bytes and
 * buys back the decode.
 *
 * ── Why this returns null instead of always returning a path ─────────────────────
 *
 * It used to be substitution alone, and every caller emitted the `<source>`
 * unconditionally. A `<picture>` source does not fall back when its file 404s, so an
 * asset with no variant rendered as a broken box — on phones only, which is why it
 * survived desktop checks. team-eugene.webp is 800x800 and the variants were generated
 * for images wider than 1100px, so it never had one.
 *
 * Callers must therefore guard: `{mobileSrc(x) && <source ... />}`. Returning null
 * makes that guard the natural thing to write. For an 800px original, skipping the
 * variant is also simply correct — it is already under the 1000px target.
 *
 * The allow-list is generated from disk by scripts/gen-mobile-variants.mjs; re-run that
 * after adding or replacing an image.
 */
export const mobileSrc = (src) => {
  if (!src) return null;
  const variant = src.replace(/\.(webp|jpe?g)$/i, '@1000.jpg');
  return MOBILE_VARIANTS.has(variant) ? variant : null;
};
