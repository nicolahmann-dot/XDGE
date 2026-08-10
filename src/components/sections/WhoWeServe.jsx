import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { mobileSrc } from '../../utils/mobileSrc';
import { useSmallScreen } from '../../hooks/useSmallScreen';

const MotionLink = motion(Link);

const cards = [
  { year: 'The XDGE', lines: ['GRADUATES', 'AND EARLY CAREER'], img: '/assets/graduates-card.webp' },
  { year: 'The XDGE', lines: ['UNIVERSITY', 'APPLICANTS'], img: '/assets/serve-02.webp' },
  { year: 'The XDGE', lines: ['SCHOOL', 'STUDENTS'], img: '/assets/school-entry-edge.jpg' },
  { year: 'The XDGE', lines: ['SPECIALIST', 'PATHWAYS'], img: '/assets/serve-04.webp' },
];

const serveCardHeadingProps = {
  lineClasses: ['xdge-condensed-solid-white', 'xdge-condensed-solid-white'],
  lineClipClasses: ['xdge-condensed-clip-narrow', 'xdge-condensed-clip-narrow'],
  lineInnerClasses: ['xdge-tier-text-narrow', 'xdge-tier-text-narrow'],
  style: {
    fontFamily: theme.displayCondensed,
    fontSize: 'clamp(40px, 5.2vw, 68px)',
    lineHeight: 0.86,
    letterSpacing: '-0.02em',
    color: theme.base,
  },
};

// Each card drives its own reveal and carries its own cascade delay.
//
// Previously these inherited "visible" from the surrounding `Group`'s
// `whileInView`. That is the fragile path: `whileInView` with `once: true`
// latches its observer the moment the element is seen, and if the variant does
// not resolve on that exact pass the element is left on `hidden` — opacity 0,
// 48px down — with nothing still watching to correct it. Measured on Home: two
// of the four cards sat permanently at `matrix(1,0,0,1,0,48)` with opacity 0
// while the other two were never given an initial style at all, and which pair
// lost varied per load. `SplitHeading` documents the same hazard and solves it
// the same way — latch the FACT of having been seen with `useInView`, then drive
// `animate` from that, so the target is free to resolve late.
// Tightened cascade: 0.06s apart over 0.55s, so all four are in within ~0.73s.
// At the previous 0.13s / 0.85s the last card only landed 1.24s after the first,
// and scrolling at any pace put the reader inside that window — which is why the
// section read as "sometimes one card, sometimes all". Still one-by-one, just
// quick enough that a normal scroll arrives after it, not during it.
const cardReveal = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

function ServeCard({ card, index, hovered, onEnter, onLeave, style }) {
  const isHovered = hovered === index;
  const cardRef = useRef(null);
  const seen = useInView(cardRef, { once: true, amount: 0.15 });

  // Phones keep the parallax at a shorter travel — see ParallaxImage for why a JS
  // scroll transform always trails the card, and why less travel makes that gap
  // cover less ground on screen.
  const small = useSmallScreen();
  const drift = small ? 10 : 25;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);

  // Promote to its own compositor layer only while the card is near the viewport.
  // `will-change: transform` was set unconditionally, which pinned a full-resolution
  // texture for all four card images for the entire session. Under GPU memory
  // pressure the compositor can drop those layers' backing store, and the card
  // contents blink out until it is re-rasterized — which is what "sometimes they
  // vanish after a while" looks like. ParallaxImage was already gated this way for
  // the same reason; this card had been missed.
  const near = useInView(cardRef, { margin: '300px 0px 300px 0px' });

  return (
    <MotionLink data-no-reveal
      ref={cardRef}
      to="/programmes"
      custom={index}
      variants={cardReveal}
      initial="hidden"
      animate={seen ? 'visible' : 'hidden'}
      data-cursor="grow"
      className="xg-glass-solid xg-tilt"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        textDecoration: 'none',
        color: theme.base,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 4,
        ...style,
      }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '4/3',
        background: '#000000',
      }}>
        {/* Image settle on reveal. Tuned to LAND WITH the card's fade, not after
            it: the card itself fades up over 0.85s (fadeUp), so a 1.4s settle left
            the image still creeping inward for another half second after the card
            had visibly arrived — which reads as the section being stuck or
            dragging even though it renders at a clean 60fps. 0.9s with a smaller
            1.06 start finishes with the fade and reads as one motion.
            Same easing as fadeUp so the two curves agree. */}
        <motion.div
          variants={{
            hidden: { scale: 1.06 },
            visible: { scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
          }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={mobileSrc(card.img)} />
            <motion.img
              src={card.img}
              alt={card.lines.join(' ')}
              loading="lazy"
              decoding="async"
              // Hover zoom intentionally left to CSS (`.xg-glass-solid:hover img`),
              // as on the Insights and Is-This-Right-For-Me cards. This element also
              // carried `animate={{ scale: isHovered ? 1.06 : 1 }}`, and since the
              // CSS rule sets the standalone `scale` property while framer writes
              // `transform`, the two composed instead of overriding — so hovering
              // actually zoomed ~1.12, not 1.06. Dropping the JS copy fixes the
              // doubled zoom and removes a per-hover JS animation on an image that
              // is already running a scroll-linked parallax.
              style={{
                position: 'absolute',
                top: `-${drift}%`,
                left: 0,
                width: '100%',
                height: `${100 + drift * 2}%`,
                objectFit: 'cover',
                willChange: near ? 'transform' : 'auto',
                y: imgY,
              }}
            />
          </picture>
        </motion.div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              padding: '10px 18px',
              background: theme.dark,
              color: theme.base,
              borderRadius: 4,
              fontSize: 13, fontWeight: 500, letterSpacing: '0.02em',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >View Project →</motion.div>
        </div>
      </div>

      <div style={{
        padding: 'clamp(24px, 3vw, 32px)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(16px, 2.5vw, 24px)',
        flex: 1,
      }}>
        <div style={{ fontSize: 12, color: theme.subtitle, letterSpacing: '0.04em' }}>
          {card.year}
        </div>
        <div className="xg-serve-card-heading">
          <SplitHeading
            tag="h3"
            lines={card.lines}
            {...serveCardHeadingProps}
          />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          alignItems: 'flex-end', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: theme.base,
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.4s ease'
            }}>
              See Programme
            </span>
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                borderColor: isHovered ? theme.base : theme.borderDark,
              }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                borderWidth: 1, borderStyle: 'solid', borderColor: theme.borderDark,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, color: theme.base, flexShrink: 0,
              }}
            >↗</motion.div>
          </div>
        </div>
      </div>
    </MotionLink>
  );
}


export function WhoWeServe() {
  const [hovered, setHovered] = useState(null);

  return (
    <section data-screen-label="05 Who We Serve" data-section-theme="dark" className="xg-whos-section" style={{
      background: theme.dark, color: theme.base,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px) clamp(72px, 9vw, 120px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <div className="xg-whos-heading-wrap">
            <SplitHeading
              lines={[
                <span className="xdge-whos-line">
                  <span className="xdge-whos-solid">
                    <span className="xdge-whos-wh">WH</span>
                    <span className="xdge-whos-os-stack">
                      <span className="xdge-whos-solid-base">O&rsquo;S</span>
                      <span className="xdge-whos-solid-cut" aria-hidden="true">O&rsquo;S</span>
                    </span>
                  </span>
                  <span className="xdge-whos-hollow"> IT FOR?</span>
                </span>,
              ]}
              lineClipClasses={['xdge-whos-clip']}
              style={{
                fontFamily: theme.displayCondensed,
                fontSize: 'clamp(52px, 14.5vw, 240px)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginInline: 'auto',
              }}
            />
          </div>
        </Group>

        {/* Cards are equal height (two-line hollow titles) but kept STAGGERED —
            A plain div, not a `Group`: each card now owns its reveal and its own
            cascade delay, so an orchestrator here would drive nothing. */}
        <div className="xg-2" style={{ gap: 'clamp(24px, 4vw, 40px)', alignItems: 'flex-start' }}>
          {cards.map((c, i) => (
            <ServeCard
              key={i}
              card={c}
              index={i}
              hovered={hovered}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
              style={{
                width: '80%',
                margin: '0 auto',
                marginTop: i % 2 !== 0 ? 'clamp(40px, 8vw, 100px)' : 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
