import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';

// Carousel 2 imagery — every image from "Images for Carousel 2" (optimized WebP),
// used once. Fixed-size square cards, image only (no text).
const items = [
  { img: '/assets/leave-1.webp' },
  { img: '/assets/leave-2.webp' },
  { img: '/assets/leave-3.webp' },
  { img: '/assets/leave-4.webp' },
  { img: '/assets/leave-5.webp' },
  { img: '/assets/leave-7.webp' },
  { img: '/assets/WhatsApp Image 2026-06-16 at 1.04.14 PM.jpeg', cover: true },
];

function LeaveCard({ img, cover }) {
  return (
    <div
      className="xg-glass-solid"
      style={{
        position: 'relative',
        width: 'clamp(240px, 28vw, 420px)',
        aspectRatio: '1 / 1',
        flexShrink: 0,
        // trailing gap lives INSIDE the card so two copies tile seamlessly under
        // the -50% marquee translate (matches the footer strip technique).
        marginRight: 'clamp(16px, 2.5vw, 40px)',
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${theme.borderDark}`,
        background: `#0a0a0a url("${img}") center/${cover ? 'cover' : 'contain'} no-repeat`,
      }}
    />
  );
}

export function WhatYouLeaveWith() {
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
            lineHeight: 0.88,
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

      {/* Continuous auto-scroll marquee (same mechanism as the footer
          CAREER · UNIVERSITY · SCHOOL strip): two copies of the cards tile
          seamlessly, translate 0 → -50% forever, pause on hover. Pure CSS on
          the compositor thread — zero main-thread cost. */}
      <div data-reveal style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '20px 0' }}>
        <div
          className="xg-leave-marquee"
          style={{ display: 'flex', width: 'max-content' }}
        >
          {[...items, ...items].map((it, i) => (
            <LeaveCard key={i} img={it.img} cover={it.cover} />
          ))}
        </div>
      </div>
    </section>
  );
}
