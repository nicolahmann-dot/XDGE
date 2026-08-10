import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useSmallScreen } from '../../hooks/useSmallScreen';
import { mobileSrc } from '../../utils/mobileSrc';

/**
 * ParallaxImage — the image drifts vertically inside its frame as the page
 * scrolls (Boldz-style, matching the "Who Is It For" cards). The wrapper clips;
 * the image is oversized by `range`% at top & bottom so an edge is never
 * revealed as it moves. Drop-in replacement for a `div > img` image frame.
 *
 * Pass the frame's shape (aspectRatio / height / borderRadius) via `style`.
 * Hover-zoom keeps working because it animates `scale`, which composes with
 * the `y` transform used here.
 */
export function ParallaxImage({
  src,
  alt = '',
  range = 16,
  className,
  style,
  imgStyle,
  objectPosition = '50% 50%',
  // Lazy by default. Every ParallaxImage on the site sits below the fold (they are
  // card and row images), so eager loading only meant all of them competed for
  // bandwidth and decode time during first paint, and their decodes then landed
  // inside the first scroll frames. Pass loading="eager" explicitly for anything
  // genuinely above the fold.
  loading = 'lazy',
}) {
  const ref = useRef(null);

  // Phones keep the parallax but at a shorter travel. Be clear about the trade: the
  // page scrolls on the compositor thread while this `y` is computed in JS on the
  // main thread, so the image can only ever trail the card it sits in — that gap is
  // what reads as the image juddering, and no amount of tuning removes it entirely.
  // What a shorter travel does is shrink how far behind it can visibly get: 6% of
  // the frame instead of 16%, so the same lag in milliseconds covers a third of the
  // distance on screen.
  const small = useSmallScreen();
  const parallax = small ? Math.round(range * 0.4) : range;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  // `will-change: transform` used to be set unconditionally, which pinned a
  // separate compositor layer (and its full-resolution texture) for every
  // parallax image on the page at once — on an image-heavy page like Home that
  // is a large standing GPU allocation, and the memory pressure shows up as
  // scroll stutter rather than as anything visibly wrong. Promote only while the
  // image is near the viewport, i.e. only while its parallax is observable.
  const near = useInView(ref, { margin: '300px 0px 300px 0px' });

  // /assets/foo.webp -> /assets/foo@1000.jpg, or null when no variant exists. The
  // substitution used to live here and ran unconditionally, which emitted a <source>
  // pointing at a file that wasn't there for any image under 1100px — a <picture>
  // source does not fall back on 404, so it rendered as a broken box on phones.
  const variant = mobileSrc(src);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Phones get a 1000px variant, not the 1600px original. `srcset` alone is no
          use here: at DPR 3 a 390px phone computes a need of ~1170px and picks the
          1600px file anyway, which is the opposite of the point. A `<picture>` media
          condition is the only way to make the choice by viewport rather than by
          pixel density. Measured on Home: 31MP decoded against 14.7MP the screen can
          actually show; the variants are 1.0MP each instead of 2.56MP. */}
      <picture>
        {variant && <source media="(max-width: 768px)" srcSet={variant} />}
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          style={{
            position: 'absolute',
            top: `-${parallax}%`,
            left: 0,
            width: '100%',
            height: `${100 + parallax * 2}%`,
            objectFit: 'cover',
            objectPosition,
            y,
            willChange: near ? 'transform' : 'auto',
            display: 'block',
            ...imgStyle,
          }}
        />
      </picture>
    </div>
  );
}
