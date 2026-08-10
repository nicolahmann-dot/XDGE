import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';

export function AboutWhyLead() {
  return (
    <section
      data-screen-label="Why Lead"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <SplitHeading
          tag="h2"
          lines={[
            <span className="xdge-why-heading-line">
              <span className="xdge-why-solid">WHY </span>
              <span className="xdge-why-hollow">LEAD</span>
            </span>,
          ]}
          lineClipClasses={['xdge-why-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 1,
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        />

        <motion.div
          data-no-reveal
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ maxWidth: 640 }}
        >
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 1.55,
            color: theme.base,
            margin: 0,
            fontWeight: 500,
          }}>
            Leadership is not a title — it is the courage to stand behind something
            you believe in, take ownership, and create impact. XDGE exists because
            young people deserve to discover that capability early, long before
            opportunities arrive.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
