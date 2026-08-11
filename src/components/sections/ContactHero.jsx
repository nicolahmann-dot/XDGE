import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';
import { SplitHeading } from '../primitives/SplitHeading';

function ContactHeading() {
  return (
    <SplitHeading
      tag="h1"
      lines={['CONTACT US']}
      lineClasses={['xdge-contact-hero-heading']}
      lineClipClasses={['xdge-about-us-clip']}
      style={{
        fontFamily: theme.displayCondensed,
        fontSize: 'clamp(56px, 13vw, 220px)',
        lineHeight: 0.756,
        margin: 0,
      }}
    />
  );
}

export function ContactHero() {
  return (
    <section
      data-screen-label="01 Contact Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient src="/assets/videos/hero.mp4" overlayOpacity={0.25} />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 120px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <ContactHeading />
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              fontFamily: theme.displayTight, fontWeight: 500,
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.4, letterSpacing: '-0.005em',
              color: theme.base,
              marginTop: 'clamp(14px, 2vw, 32px)',
              maxWidth: '34ch',
            }}
          >
            We&rsquo;d love to hear from you.
          </motion.div>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7 }}
            style={{ maxWidth: 560 }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              lineHeight: 1.5,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
            }}>
              Whether you&rsquo;re exploring programmes for yourself, your child,
              or your organisation, we&rsquo;d be delighted to learn more about
              your goals and discuss how XDGE may be able to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
