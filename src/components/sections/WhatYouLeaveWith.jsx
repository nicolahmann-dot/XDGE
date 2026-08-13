import { useState } from 'react';
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

function Slice({ item, isActive, onSelect }) {
  return (
    <button
      type="button"
      className="xg-fs-slice"
      data-active={isActive || undefined}
      data-cursor="grow"
      aria-pressed={isActive}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
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
    </button>
  );
}

export function WhatYouLeaveWith() {
  const [active, setActive] = useState(0);

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
      <div className="xg-fs-row" data-no-reveal>
        {items.map((it, i) => (
          <Slice
            key={it.img}
            item={it}
            isActive={i === active}
            onSelect={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
