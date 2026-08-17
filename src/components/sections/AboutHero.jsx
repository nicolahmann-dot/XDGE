import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';

export function AboutHero() {
  return (
    <section
      data-screen-label="About Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        position: 'relative', overflow: 'visible',
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 120px)',
      }}
    >
      {/* No ambient video here. The About hero is the section's own dark ground now —
          the gold_swirls loop was removed outright rather than made lighter. */}
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.h1
          data-no-reveal
          className="xdge-about-us-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            className="xdge-about-us-heading-img"
            src="/assets/new-ABOUT-US.jpeg"
            alt="About Us"
            decoding="async"
          />
        </motion.h1>

        <div className="xg-about-hero-copy" style={{
          display: 'flex', justifyContent: 'flex-end',
          marginTop: 'clamp(120px, 22vw, 360px)',
        }}>
          <div style={{ maxWidth: 640 }}>
            <h3 data-reveal="blur" style={{
              fontFamily: theme.body,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              lineHeight: 1.3, fontWeight: 600,
              color: theme.base, margin: 0,
            }}>
              Professional Leadership Development Re-engineered for Young People 12&ndash;24+
            </h3>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.35)',
              margin: 'clamp(18px, 2.4vw, 28px) 0',
            }} />
            <p style={{
              fontSize: 'clamp(12px, 1.3vw, 14px)',
              lineHeight: 1.6, margin: 0, color: theme.base,
            }}>
              It starts when an individual takes ownership of an idea, stands behind
              something they care about, and develops the confidence to make a positive
              impact. XDGE was built to create those opportunities for young people
              ages 12&ndash;24+.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
