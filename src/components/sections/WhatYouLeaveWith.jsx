import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { theme } from '../../theme';
import { mobileSrc } from '../../utils/mobileSrc';
import { SplitHeading } from '../primitives/SplitHeading';

// Carousel 2 imagery, in filename order — card-1 … card-7. Built from the
// 4750px source art by scripts/optimize-images.mjs.
//
// Image only: no number, no title, no caption. The artefacts speak for
// themselves and the section heading already says what they are. `alt` is
// therefore the only place the meaning is written down, so it names the
// artefact rather than just describing the photograph.
const items = [
  {
    img: '/assets/card-1.webp',
    alt: 'Leadership Playbook — a personalised roadmap for your next opportunity and future growth.',
  },
  {
    img: '/assets/card-2.webp',
    alt: 'Leadership Portfolio — a professional showcase of your projects, achievements, leadership, and impact.',
  },
  {
    img: '/assets/card-3.webp',
    alt: 'Recorded Capstone Presentation — evidence of how you think, communicate, and perform as a leader.',
  },
  {
    img: '/assets/card-4.webp',
    alt: 'Skills Transcript — a verified record of the skills and capabilities you have demonstrated.',
  },
  {
    img: '/assets/card-5.webp',
    alt: 'Interview & Opportunity Rehearsal — practical preparation for interviews and competitive selection.',
  },
  {
    img: '/assets/card-6.webp',
    alt: 'Certificate of Completion — formal recognition of your achievement and progression.',
  },
  {
    img: '/assets/card-7.webp',
    alt: 'Letter of Recommendation — a personal endorsement from experienced leaders and professionals.',
  },
];

function Slice({ item, index, isActive, onSelect, entered }) {
  return (
    // The open/closed width is CSS: `flex-grow` on the element, transitioned by
    // the stylesheet. Framer only carries the entrance fade here — its layout
    // animation was tried first and the widths still changed in one frame,
    // whereas a CSS transition on flex-grow is something the browser is
    // guaranteed to interpolate, and it retargets from its current value when
    // the pointer moves to the next slice mid-slide.
    <motion.button
      type="button"
      className="xg-fs-slice"
      data-active={isActive || undefined}
      data-cursor="grow"
      aria-pressed={isActive}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      initial={{ opacity: 0 }}
      animate={{ opacity: entered ? 1 : 0 }}
      transition={{ duration: 0.5, delay: entered ? index * 0.07 : 0, ease: 'easeOut' }}
    >
      <picture>
        {mobileSrc(item.img) && (
          <source media="(max-width: 768px)" srcSet={mobileSrc(item.img)} />
        )}
        <img
          className="xg-fs-img"
          src={item.img}
          alt={item.alt}
          decoding="async"
          loading="lazy"
        />
      </picture>
    </motion.button>
  );
}

export function WhatYouLeaveWith() {
  // Starts with nothing open, so all seven sit as equal columns. The strip then
  // opens the first one itself once it is on screen — the section introduces its
  // own mechanic instead of arriving already in its resting state.
  const [active, setActive] = useState(null);
  // Set the moment the pointer picks a slice, so the opening timer below cannot
  // fire afterwards and drag the strip back to the first panel while someone is
  // already hovering their way along it.
  const touched = useRef(false);
  const rowRef = useRef(null);
  const entered = useInView(rowRef, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!entered) return undefined;
    // After the columns have faded in, not with them: the expand has to be the
    // thing you watch, and it is invisible under seven simultaneous fades.
    const t = setTimeout(() => {
      if (!touched.current) setActive(0);
    }, reduced ? 0 : 620);
    return () => clearTimeout(t);
  }, [entered, reduced]);

  return (
    <section
      data-screen-label="What You Leave With"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 9vw, 120px) 0',
      }}
    >
      <div className="xg-leave-with-header">
        <SplitHeading
          lines={[
            <span className="xdge-leave-with-solid">WHAT YOU</span>,
            <span className="xdge-leave-with-hollow">LEAVE WITH</span>,
          ]}
          lineClipClasses={['xdge-leave-with-clip', 'xdge-leave-with-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            lineHeight: 0.75,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            width: '100%',
            maxWidth: '100%',
          }}
        />
        <p className="xg-section-lede xg-leave-with-lede">
          Proof of your capability. Ready for selection.
        </p>
      </div>

      {/* Not wrapped in `data-reveal`: fading the strip in as one block would
          animate opacity across a container holding seven full-size artefact
          images, which flattens the whole subtree into a single composited
          layer and forces every image to decode for it. The slices carry their
          own interaction instead. */}
      <div className="xg-fs-row" data-no-reveal ref={rowRef}>
        {items.map((it, i) => (
          <Slice
            key={it.img}
            item={it}
            index={i}
            isActive={i === active}
            onSelect={() => {
              touched.current = true;
              setActive(i);
            }}
            entered={entered}
          />
        ))}
      </div>
    </section>
  );
}
