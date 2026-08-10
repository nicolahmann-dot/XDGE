import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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
    line2: 'We identify a project and pathway that will help you grow, stand out, and prepare for your next step.',
    icon: Icons.Search,
    offset: 152,
  },
  {
    n: '02',
    title: 'Build Your Inner Leadership',
    line1: 'During the first 4–5 weeks, you build self-awareness, confidence, and resilience.',
    line2: 'The leadership foundations needed to create a strong internal operating system.',
    icon: Icons.Bulb,
    offset: 78,
  },
  {
    n: '03',
    title: 'Develop Your Professional Skillset',
    line1: 'You develop the communication, professional, and leadership skills.',
    line2: 'The skills that help people create results in the real world.',
    icon: Icons.Briefcase,
    offset: 30,
  },
  {
    n: '04',
    title: 'Lead A Real-World Project',
    line1: 'Put leadership into practice by taking your project from idea to implementation.',
    line2: 'Apply your skills to create meaningful impact.',
    icon: Icons.Flag,
    offset: 30,
  },
  {
    n: '05',
    title: 'Build Your Leadership Portfolio',
    line1: 'Create a professional portfolio that showcases your project, achievements, and journey.',
    line2: 'Evidence of your capability for your next-level goal.',
    icon: Icons.Clipboard,
    offset: 78,
  },
  {
    n: '06',
    title: 'Present Your Impact',
    line1: 'Showcase your project to a panel of leaders and prepare for interviews.',
    line2: 'Demonstrate readiness for your next opportunity.',
    icon: Icons.Trophy,
    offset: 152,
  },
];

const fadeEase = [0.22, 1, 0.36, 1];


export function TheJourney() {
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
        <Group className="xg-journey-header" style={{ display: 'flex', flexDirection: 'column', marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div className="xg-journey-heading-wrap" style={{ position: 'relative' }}>
            <SplitHeading
              lines={[
                <span className="xdge-the-journey">THE JOURNEY</span>,
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
            marginTop: 'clamp(16px, 3vw, 32px)',
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

        <div className="xg-journey-track">
          {/* Curve area: the line DRAWS first, then the icons pop in one-by-one */}
          <motion.div
            className="xg-journey-curve-area"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <svg
              className="xg-journey-curve"
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 100 180 C 320 30 880 30 1100 180"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 1, transition: { duration: 2.4, ease: fadeEase, delay: 0.1 } },
                }}
              />
              <motion.path
                d="M 1090 172 L 1108 180 L 1090 188"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6, delay: 2.3 } },
                }}
              />
            </svg>

            {/* icons start after the line finishes drawing, then stagger in */}
            <motion.div
              className="xg-journey-circles"
              variants={{
                hidden: {},
                visible: { transition: { delayChildren: 2.5, staggerChildren: 0.13 } },
              }}
            >
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className="xg-journey-circle-cell"
                  style={{ paddingTop: s.offset }}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: fadeEase } },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, borderColor: theme.accent, boxShadow: `0 0 20px rgba(32, 227, 232, 0.3)` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: theme.dark,
                      border: `1px solid ${theme.base}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: theme.base,
                      flexShrink: 0,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    }}>
                    {s.icon}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="xg-journey-labels">
            {steps.map((s) => (
              <div key={s.n} className="xg-journey-label-cell">
                <div style={{
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 'clamp(22px, 2.2vw, 30px)',
                  lineHeight: 1, letterSpacing: '-0.01em',
                  color: theme.base,
                  marginBottom: 10,
                }}>{s.n}</div>
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 700,
                  fontSize: 'clamp(13px, 1.25vw, 16px)',
                  lineHeight: 1.18, letterSpacing: '-0.005em',
                  margin: '0 0 10px',
                  textTransform: 'uppercase',
                  color: theme.base,
                }}>{s.title}</h3>
                <p style={{
                  fontSize: 'clamp(11px, 1vw, 12px)',
                  lineHeight: 1.5,
                  margin: '0 0 6px',
                  color: theme.base,
                  fontWeight: 500,
                }}>{s.line1}</p>
                <p style={{
                  fontSize: 'clamp(11px, 1vw, 12px)',
                  lineHeight: 1.5,
                  margin: 0,
                  color: theme.subtitle,
                }}>{s.line2}</p>
              </div>
            ))}
          </div>

          <Group className="xg-journey-mobile">
            {steps.map((s) => (
              <div
                key={s.n}
                data-reveal
                className="xg-journey-mobile-step"
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: theme.dark,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.base,
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: theme.display, fontWeight: 900,
                    fontSize: 22, lineHeight: 1, letterSpacing: '-0.01em',
                    color: theme.base,
                    marginBottom: 6,
                  }}>{s.n}</div>
                  <h3 style={{
                    fontFamily: theme.display, fontWeight: 700,
                    fontSize: 17, lineHeight: 1.2, letterSpacing: '-0.005em',
                    margin: '0 0 8px',
                    textTransform: 'uppercase',
                    color: theme.base,
                  }}>{s.title}</h3>
                  <p style={{
                    fontSize: 13, lineHeight: 1.5,
                    margin: '0 0 6px',
                    color: theme.base,
                    fontWeight: 500,
                  }}>{s.line1}</p>
                  <p style={{
                    fontSize: 13, lineHeight: 1.5,
                    margin: 0,
                    color: theme.subtitle,
                  }}>{s.line2}</p>
                </div>
              </div>
            ))}
          </Group>
        </div>
      </div>
    </section>
  );
}
