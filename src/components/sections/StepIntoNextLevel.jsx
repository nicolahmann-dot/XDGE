import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

function PlayIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
      <path d="M0 0v12l10-6z" />
    </svg>
  );
}

export function StepIntoNextLevel() {
  return (
    <section
      data-screen-label="Step Into Your Next Level"
      data-section-theme="dark"
      className="xg-cta-stand-section"
      style={{
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div className="xg-cta-stand-inner" style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group className="xg-cta-stand-grid">
          <div className="xg-cta-stand-copy">
            <SplitHeading
              tag="h2"
              lines={[
                <span className="xdge-leave-with-hollow">LET&rsquo;S CHAT</span>,
                <span className="xdge-leave-with-hollow">ABOUT YOUR</span>,
                <span className="xdge-leave-with-solid">NEXT LEVEL</span>,
              ]}
              lineClipClasses={[
                'xdge-clip-tight-y xdge-cta-clip',
                'xdge-clip-tight-y xdge-cta-clip',
                'xdge-clip-tight-y xdge-cta-clip',
              ]}
              style={{
                fontFamily: theme.displayCondensed,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            />

            <motion.div
              data-no-reveal
              variants={fadeUp}
              className="xg-cta-stand-lede"
            >
              <p style={{ margin: '0 0 6px', fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.5, color: theme.base }}>
                Your beliefs. Your purpose. Your impact.
              </p>
              <p style={{ margin: 0, fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.5, color: theme.base, fontWeight: 700 }}>
                It starts with you.
              </p>
            </motion.div>

            <motion.div
              data-no-reveal
              variants={fadeUp}
              className="xg-cta-stand-actions"
            >
              <Link to="/contact" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
                Contact <PlayIcon />
              </Link>
              <Link to="/apply" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-outline">
                Apply <PlayIcon />
              </Link>
            </motion.div>
          </div>
        </Group>
      </div>
    </section>
  );
}
