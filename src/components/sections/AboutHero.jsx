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
            src="/assets/new-about-us-1.png"
            alt="About Us"
            decoding="async"
          />
        </motion.h1>

        <div className="xg-about-hero-copy" style={{
          display: 'flex', justifyContent: 'flex-end',
          marginTop: 'clamp(72px, 12vw, 200px)',
        }}>
          <div style={{ maxWidth: 640 }}>
            <h3 data-reveal="blur" style={{
              fontFamily: theme.body,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              lineHeight: 1.3, fontWeight: 600,
              color: theme.base, margin: 0,
            }}>
              Professional Development Built Around Who You
              Want To Become & Where You Want To Go Next.
            </h3>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.35)',
              margin: 'clamp(18px, 2.4vw, 28px) 0',
            }} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1em',
              fontSize: 'clamp(12px, 1.3vw, 14px)',
              lineHeight: 1.6,
              color: theme.base,
            }}>
              <p style={{ margin: 0 }}>
                We are a team of leadership specialists, educators and industry
                professionals brought together by one belief: everyone has a
                distinctive edge, a spark that enables them to do something better
                than most.
              </p>
              <p style={{ margin: 0 }}>
                Through decades of working with leaders and teams around the world,
                we have seen people flourish in environments that recognise their
                individuality, draw out their strengths and open up new pathways
                that energise them and inspire them to step forward, take ownership
                and lead.
              </p>
              <p style={{ margin: 0 }}>
                This belief shapes everything we do. We create a highly professional
                and inclusive environment built on genuine relationships, real-world
                insight and a shared commitment to discovering what ignites you and
                getting you where you need to go.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
