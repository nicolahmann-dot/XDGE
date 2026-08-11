import { useRef } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';
import { SplitHeading } from '../primitives/SplitHeading';

function OutcomesHeading() {
  return (
    <SplitHeading
      tag="h1"
      lines={['OUTCOMES.']}
      style={{
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(40px, 11.3vw, 200px)',
        lineHeight: 0.75, letterSpacing: '-0.03em',
        color: theme.base,
      }}
    />
  );
}

export function OutcomesHero() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      data-screen-label="01 Outcomes Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient src="/assets/videos/gold_swirls.mp4" />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 120px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{
              fontFamily: theme.display, fontWeight: 700,
              fontSize: 'clamp(18px, 5.09vw, 90px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: theme.base,
              marginBottom: 'clamp(8px, 1.5vw, 16px)',
              textTransform: 'capitalize',
            }}
          >
            The
          </motion.div>
          <OutcomesHeading />
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
            style={{
              fontFamily: theme.displayTight, fontWeight: 500,
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.4, letterSpacing: '-0.005em',
              color: theme.base,
              marginTop: 'clamp(14px, 2vw, 32px)',
              maxWidth: '36ch',
            }}
          >
            Built for your next opportunity. Proven through action.
          </motion.div>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2.5vw, 28px)',
              maxWidth: 560,
            }}
          >
            <p style={{
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              lineHeight: 1.32,
              color: theme.base, margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}>
              Leave equipped with the skills, tools, and confidence for your
              next big step.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              lineHeight: 1.55,
              color: theme.subtitle, margin: 0,
            }}>
              Prepared to perform in interviews, with clear evidence of your
              leadership and readiness for future opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
