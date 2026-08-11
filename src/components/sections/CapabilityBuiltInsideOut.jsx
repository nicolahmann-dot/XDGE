import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { PerformanceDiagram } from './OurPerformanceFormula';
import { HeroMotion } from '../HeroMotion';

const fadeEase = [0.2, 0.7, 0.2, 1];

export function CapabilityBuiltInsideOut() {
  return (
    <section
      data-screen-label="Capability Built Inside Out"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <HeroMotion variant="cohort" />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            alignItems: 'center',
            gap: 'clamp(32px, 5vw, 72px)',
            marginBottom: 'clamp(48px, 7vw, 88px)',
          }}
          className="xg-cap-grid"
        >
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: fadeEase }}
          >
            <PerformanceDiagram maxWidth={760} />
          </motion.div>

          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: fadeEase }}
            style={{ textAlign: 'right' }}
          >
            <SplitHeading
              lines={['CAPABILITY', 'BUILT', 'INSIDE', 'OUT']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(40px, 11.3vw, 200px)',
                lineHeight: 0.75, letterSpacing: '-0.02em',
                textAlign: 'right',
              }}
            />
          </motion.div>
        </div>

        <div style={{
          height: 1, background: 'rgba(255,255,255,0.18)',
          marginBottom: 'clamp(40px, 6vw, 64px)',
        }} />

        <Group
          className="xg-2"
          style={{
            alignItems: 'flex-start',
            gap: 'clamp(32px, 6vw, 80px)',
          }}
        >
          <div data-reveal>
            <div style={{
              display: 'flex', flexDirection: 'column',
              gap: 8,
              fontFamily: theme.body, fontWeight: 500,
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.35,
              letterSpacing: '-0.005em',
              color: theme.base,
              maxWidth: 480,
            }}>
              <div>Our thinking shapes our behaviours.</div>
              <div>Our behaviours shape our actions.</div>
              <div>Our actions determine our results.</div>
            </div>
          </div>

          <div
            data-reveal
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(18px, 2vw, 24px)',
              maxWidth: 560,
            }}
          >
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.subtitle,
            }}>
              Most people try to improve performance by focusing on what they do.
              Real performance is built by strengthening how you think, behave,
              and act together.
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.subtitle,
            }}>
              When these three layers are aligned, you operate with clarity,
              consistency, and control. This is what allows you to perform at
              your next level.
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.base, fontWeight: 500,
            }}>
              This is the framework we use across every XDGE programme to
              develop how you think, act, and perform.
            </p>

            <motion.a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: fadeEase }}
              href="/about"
              data-cursor="grow"
              style={{
                alignSelf: 'flex-start',
                marginTop: 'clamp(8px, 1.5vw, 16px)',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 24px',
                border: `1px solid ${theme.ink}`,
                color: theme.base, textDecoration: 'none',
                fontSize: 13, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontWeight: 600,
              }}
            >
              More About Us <span style={{ fontSize: 16 }}>→</span>
            </motion.a>
          </div>
        </Group>
      </div>
    </section>
  );
}
