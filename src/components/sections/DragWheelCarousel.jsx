import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { theme, cardRise, cardStagger } from '../../theme';
import { mobileSrc } from '../../utils/mobileSrc';
import { Group, Reveal } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

// Four pathways in the order the copy sets, which is NOT the order the artwork
// was numbered in — `img` carries each one's own file, so reordering this list
// never desyncs the pictures from the titles.
//
// The images are the optimised variants built by scripts/optimize-images.mjs
// from the source PNGs, which are 8-14MB each with spaces, commas and ampersands
// in their names; those originals live in art-source/ and never reach the build.
const pathways = [
  {
    title: 'Business & Entrepreneurship',
    desc: 'Bring a business idea to life and learn how to lead it from concept to launch. Develop and pitch your idea, test it in the market or build a small enterprise that sets you apart as a future business leader or entrepreneur.',
    img: '/assets/pathway-1.webp',
  },
  {
    title: 'Research, Creativity & Innovation',
    desc: 'Question what exists and learn how to lead original thinking from enquiry to impact. Investigate an important issue or develop a creative idea, challenge assumptions and present credible work that sets you apart as a future researcher, creator or innovator.',
    img: '/assets/pathway-4.webp',
  },
  {
    title: 'Leadership & Social Impact',
    desc: 'Identify what needs to change and learn how to lead an initiative from idea to impact. Influence stakeholders, unite others around a shared goal and create measurable change that sets you apart as a future leader and changemaker.',
    img: '/assets/pathway-3.webp',
  },
  {
    title: 'Science & Technology',
    desc: 'Identify a real-world need and learn how to lead a scientific or technological solution from concept to creation. Research, design and test your idea to set yourself apart as a future scientist, technologist or leader in your field.',
    img: '/assets/pathway-2.webp',
  },
];

// The reference component animates every one of these states on a single tween:
// 0.6s, cubic-bezier(1, .06, .37, .82). Keeping one curve is what makes the fill,
// the arrow and the image read as one movement rather than three.
const EASE = [1, 0.06, 0.37, 0.82];

// One arrow, rotated a quarter turn when the card opens — the reference does the
// same rather than swapping in a down-arrow, so the glyph itself never blinks.
const Arrow = (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5.5h9M6.2 1.6l3.9 3.9-3.9 3.9" />
  </svg>
);

function Pathway({ item, index, open, onSelect, transition }) {
  return (
    <motion.div data-no-reveal variants={cardRise} className="xg-vt-card" data-open={open || undefined}>
      {/* The fill is its own layer so it can grow out of the card's top edge
          instead of the card resizing: scaling a background is free on the
          compositor, where animating the card's own height would relayout the
          whole column (and the image beside it) on every frame. */}
      <motion.span
        aria-hidden="true"
        className="xg-vt-fill"
        initial={false}
        animate={{ scaleY: open ? 1 : 0, opacity: open ? 1 : 0 }}
        transition={transition}
      />

      <button
        type="button"
        id={`xg-vt-tab-${index}`}
        className="xg-vt-head"
        aria-expanded={open}
        aria-controls={`xg-vt-panel-${index}`}
        onClick={onSelect}
        data-cursor="grow"
      >
        <span className="xg-vt-title">{item.title}</span>
        <span className="xg-vt-icon">
          <motion.span className="xg-vt-arrow" initial={false} animate={{ rotate: open ? 90 : 0 }} transition={transition}>
            {Arrow}
          </motion.span>
        </span>
      </button>

      {/* `data-no-reveal` because this animates itself. Without it the CSS reveal
          engine would also claim the <p> inside and fade it on its own curve
          while framer is animating the wrapper's height — the text judders
          against its own panel. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            data-no-reveal
            id={`xg-vt-panel-${index}`}
            role="region"
            aria-labelledby={`xg-vt-tab-${index}`}
            className="xg-vt-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            style={{ overflow: 'hidden' }}
          >
            <div className="xg-vt-panel-inner">
              <p className="xg-vt-desc">{item.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function DragWheelCarousel() {
  const [active, setActive] = useState(0);
  // Which image is on screen, tracked separately from which card is open. Closing
  // the last card should not blank the column beside it — the reference keeps the
  // photo of whatever you looked at last, so `shown` never goes back to null.
  const [shown, setShown] = useState(0);
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : { duration: 0.6, ease: EASE };

  const toggle = (i) => {
    setActive((current) => (current === i ? null : i));
    setShown(i);
  };

  return (
    <section
      data-screen-label="Drag Wheel Carousel"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 9vw, 120px) 0',
      }}
    >
      {/* Same 1280 wrapper the other sections use, so the heading's left edge
          lines up with the first card below it instead of running to the viewport. */}
      <div style={{ maxWidth: 1280, margin: '0 auto', marginBottom: 'clamp(36px, 5vw, 60px)', position: 'relative', zIndex: 10, padding: '0 clamp(20px, 4vw, 40px)' }}>
        <SplitHeading
          lines={[
            <span className="xdge-how-will-top-text">HOW WILL<span className="xdge-how-will-you">YOU</span></span>,
            <span className="xdge-how-will-bottom">STAND OUT?</span>,
          ]}
          lineClipClasses={[
            'xdge-clip-tight-y xdge-how-will-clip',
            'xdge-clip-tight-y xdge-how-will-clip',
          ]}
          style={{
            fontFamily: theme.displayCondensed,
            lineHeight: 0.75,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        />

        {/* Same label + intro pairing the other sections use: a 12px tracked-out
            uppercase line, then one paragraph at the site's body size. */}
        <div
          data-reveal="blur"
          style={{
            marginTop: 'clamp(22px, 3vw, 34px)',
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: theme.subtitle,
            fontWeight: 600,
          }}
        >
          Choose Your Project — Prove You Can Lead.
        </div>
        <p
          data-reveal
          style={{
            marginTop: 14,
            marginBottom: 0,
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.55,
            color: theme.subtitle,
            maxWidth: 640,
          }}
        >
          Have an idea, passion or cause you want to bring to life? We help you
          shape it into a personalised project, train you in the skills to lead it
          and mentor you through every stage.
        </p>
      </div>

      <div className="xg-vt">
        <Group className="xg-vt-list" variants={cardStagger}>
          {pathways.map((p, i) => (
            <Pathway
              key={p.title}
              item={p}
              index={i}
              open={i === active}
              onSelect={() => toggle(i)}
              transition={transition}
            />
          ))}
        </Group>

        {/* All four stack in place and crossfade. Swapping one <img> src instead
            would show a blank frame while the new file decodes; here the outgoing
            image stays until the incoming one is already painted. */}
        <Reveal className="xg-vt-media">
          {pathways.map((p, i) => (
            <picture key={p.img}>
              {mobileSrc(p.img) && (
                <source media="(max-width: 768px)" srcSet={mobileSrc(p.img)} />
              )}
              <motion.img
                className="xg-vt-img"
                src={p.img}
                alt={p.title}
                initial={false}
                animate={{ opacity: i === shown ? 1 : 0, scale: i === shown ? 1 : 1.04 }}
                transition={transition}
                decoding="async"
                loading="lazy"
              />
            </picture>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
