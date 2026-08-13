import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const iconProps = {
  width: 22, height: 22,
  viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const Icons = {
  Search: (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" />
    </svg>
  ),
  Bulb: (
    <svg {...iconProps}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a7 7 0 00-4 12.7V18h8v-2.3A7 7 0 0012 3z" />
    </svg>
  ),
  Briefcase: (
    <svg {...iconProps}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M2 13h20" />
    </svg>
  ),
  Flag: (
    <svg {...iconProps}>
      <circle cx="12" cy="14" r="3" />
      <path d="M12 11V3M12 3l5 2-5 2" />
      <path d="M9 14H6M18 14h-3M14.5 16.5l1.5 1.5M9.5 16.5L8 18" />
    </svg>
  ),
  Clipboard: (
    <svg {...iconProps}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
      <path d="M9 17h6" />
    </svg>
  ),
  Trophy: (
    <svg {...iconProps}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v6a5 5 0 01-10 0V4z" />
      <path d="M17 4h2a3 3 0 010 6h-2M7 4H5a3 3 0 000 6h2" />
    </svg>
  ),
};

const steps = [
  {
    n: '01',
    title: 'Select Your Path',
    line1: 'Together, we explore your interests, ambitions, strengths, and future goals.',
    icon: Icons.Search,
  },
  {
    n: '02',
    title: 'Build Your Inner Leadership',
    line1: 'During the first 4–5 weeks, you build self-awareness, confidence, and resilience.',
    icon: Icons.Bulb,
  },
  {
    n: '03',
    title: 'Develop Your Professional Skillset',
    line1: 'You develop the communication, professional, and leadership skills.',
    icon: Icons.Briefcase,
  },
  {
    n: '04',
    title: 'Lead A Real-World Project',
    line1: 'Put leadership into practice by taking your project from idea to implementation.',
    icon: Icons.Flag,
  },
  {
    n: '05',
    title: 'Build Your Leadership Portfolio',
    line1: 'Create a professional portfolio that showcases your project, achievements, and journey.',
    icon: Icons.Clipboard,
  },
  {
    n: '06',
    title: 'Present Your Impact',
    line1: 'Showcase your project to a panel of leaders and prepare for interviews.',
    icon: Icons.Trophy,
  },
];

const fadeEase = [0.22, 1, 0.36, 1];

// Cards must arrive one at a time as the reader scrolls, so the trigger is a
// LINE partway up the viewport rather than "is it on screen at all". With a
// plain visibility test the whole section enters at once on a tall display and
// three or four cards fire together, which is the opposite of a timeline.
// Discounting the bottom 30% means a card only animates once it has climbed
// past that line, and the interlocked spacing then hands them over in turn.
const CARD_VIEWPORT = { once: true, amount: 0.25, margin: '0px 0px -30% 0px' };

function Milestone({ step, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  // Node lights on the same line as its card and stays lit — a node that
  // re-dims on scroll-up reads as the timeline un-happening.
  const reached = useInView(ref, CARD_VIEWPORT);
  const side = index % 2 === 0 ? 'left' : 'right';

  // `li` is one of the CSS reveal engine's units, so without `data-no-reveal`
  // the item would fade in under CSS while the card inside it slides in under
  // framer — two curves on the same content.
  return (
    <li ref={ref} data-no-reveal className="xg-tl-item" data-side={side}>
      <span className="xg-tl-node" data-reached={reached || undefined} aria-hidden="true" />

      <motion.article
        data-no-reveal
        className="xg-tl-card"
        initial="hidden"
        whileInView="visible"
        viewport={CARD_VIEWPORT}
        variants={{
          hidden: { opacity: 0, x: reduced ? 0 : (side === 'left' ? -32 : 32), y: reduced ? 0 : 28 },
          visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: fadeEase } },
        }}
      >
        <div className="xg-tl-card-top">
          <span className="xg-tl-icon">{step.icon}</span>
          <span className="xg-tl-num" aria-hidden="true">{step.n}</span>
        </div>
        <h3 className="xg-tl-title">{step.title}</h3>
        <p className="xg-tl-desc">{step.line1}</p>
      </motion.article>
    </li>
  );
}

export function TheJourney() {
  const trackRef = useRef(null);

  // The rail fills against scroll position rather than a one-shot reveal, so the
  // line is always exactly as far along as the reader is. Ends at "end 70%" so
  // it completes on the last card rather than after the section has left.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 72%', 'end 70%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <section
      data-screen-label="The Journey"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group className="xg-journey-header" style={{ display: 'flex', flexDirection: 'column', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <div className="xg-journey-heading-wrap" style={{ position: 'relative' }}>
            <SplitHeading
              lines={[
                <span className="xdge-the-journey-line">
                  <span className="xdge-the-journey-hollow">THE </span>
                  <span className="xdge-the-journey-solid">JOURNEY</span>
                </span>,
              ]}
              lineClipClasses={['xdge-the-journey-clip']}
              style={{
                fontFamily: theme.displayCondensed,
                fontSize: 'clamp(40px, 11.3vw, 200px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                textAlign: 'left',
              }}
            />
          </div>

          <motion.div data-no-reveal variants={fadeUp} className="xg-journey-intro" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            textAlign: 'left',
            marginTop: 'clamp(10px, 1.8vw, 18px)',
            maxWidth: 500
          }}>
            <p className="xg-section-lede"
              style={{
                fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
                color: theme.base, margin: 0, paddingBottom: 24, maxWidth: 480,
              }}
            >
              Six stages from where you are now to where you stand out — clear,
              structured, and built around real performance.
            </p>
          </motion.div>
        </Group>

        {/* One DOM for both breakpoints: the rail moves from centre to the left
            edge in CSS and every card lands on the right of it, so there is no
            second copy of the six steps to keep in sync. */}
        <div className="xg-tl" ref={trackRef}>
          <div className="xg-tl-rail" aria-hidden="true">
            <motion.span
              className="xg-tl-rail-fill"
              style={{ scaleY: fill }}
            />
          </div>

          <ol className="xg-tl-list">
            {steps.map((s, i) => (
              <Milestone key={s.n} step={s} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
