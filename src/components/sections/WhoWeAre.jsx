import { motion } from 'framer-motion';
import { theme, fadeUp, stagger } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { mobileSrc } from '../../utils/mobileSrc';

const svg = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
};

const Icons = {
  person: (
    <svg {...svg}><circle cx="12" cy="8" r="4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>
  ),
  cap: (
    <svg {...svg}><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 10.6V16c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-5.4" /></svg>
  ),
  star: (
    <svg {...svg}><path d="M12 3.5l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L12 16.9 6.5 20l1.4-6.1L3.2 9.8l6.2-.6z" /></svg>
  ),
  globe: (
    <svg {...svg}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.7 2.4 2.7 15.6 0 18M12 3c-2.7 2.4-2.7 15.6 0 18" /></svg>
  ),
  target: (
    <svg {...svg}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></svg>
  ),
};

// content unchanged — only split into a bold lead-in + the rest for styling
const points = [
  { icon: Icons.person, bold: 'Leadership Experts', rest: ', University Professors, Senior Leaders, Investors, Entrepreneurs' },
  { icon: Icons.cap, bold: 'All Masters or PhD Qualified', rest: '' },
  { icon: Icons.star, bold: 'Each with 20+ years experience', rest: '' },
  { icon: Icons.globe, bold: 'Experience Across Multiple', rest: ' Industries Around The Globe' },
  { icon: Icons.target, bold: 'On a Mission to Give', rest: " Young People the Practical Wisdom, Leadership Skills, and Competitive Edge We Wish We'd Had Sooner" },
];

export function WhoWeAre() {
  return (
    <section
      data-screen-label="Who We Are"
      data-section-theme="dark"
      className="xg-wwa-section"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(40px, 5vw, 72px) clamp(20px, 4vw, 40px) clamp(90px, 11vw, 160px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ marginBottom: 'clamp(32px, 4.5vw, 48px)', position: 'relative' }}>
          <SplitHeading
            lines={[
              <span className="xdge-people-hollow xdge-people-line-narrow">THE PEOPLE BEHIND</span>,
              <span className="xdge-people-solid">YOUR PROGRESS</span>,
            ]}
            lineClipClasses={[
              'xdge-clip-tight-y xdge-people-clip',
              'xdge-clip-tight-y xdge-people-clip xdge-people-clip-solid',
            ]}
            style={{
              fontFamily: theme.displayCondensed,
              lineHeight: 0.75,
              letterSpacing: '-0.02em',
              textAlign: 'left',
              margin: 0,
              textTransform: 'uppercase',
            }}
          />
        </div>

        <Group className="xg-wwa-grid">
          <motion.div data-no-reveal variants={fadeUp} className="xg-wwa-img">
            <div style={{
              position: 'relative',
              width: '100%', aspectRatio: '4/5',
              borderRadius: 4, overflow: 'hidden', background: '#000000',
            }}>
              <picture>
                {mobileSrc('/assets/who-we-are.webp') && (
                  <source media="(max-width: 768px)" srcSet={mobileSrc('/assets/who-we-are.webp')} />
                )}
                <motion.img
                  src="/assets/who-we-are.webp"
                  alt="XDGE coaching session"
                  loading="lazy"
                  decoding="async"
                  // Lands with the block's fade rather than trailing it — same
                  // retune as the WhoWeServe cards. A 1.4s settle from 1.15 kept
                  // creeping for ~0.5s after the surrounding fadeUp (0.85s) had
                  // finished, which reads as the section dragging.
                  variants={{
                    hidden: { scale: 1.06 },
                    visible: { scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    display: 'block',
                  }}
                />
              </picture>
            </div>
          </motion.div>

          {/* icon + divider + bold-lead rows — each row cascades in one-by-one */}
          <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column' }}>
            {points.map((p, i) => (
              <motion.div data-no-reveal
                key={i}
                variants={fadeUp}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: 'clamp(16px, 1.8vw, 26px)',
                  padding: 'clamp(16px, 1.9vw, 24px) 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <span style={{
                  flexShrink: 0,
                  width: 'clamp(44px, 4vw, 56px)', height: 'clamp(44px, 4vw, 56px)',
                  borderRadius: '50%',
                  border: '1px solid rgba(127, 179, 255, 0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.base,
                }}>
                  {p.icon}
                </span>
                <span style={{ alignSelf: 'stretch', width: 1, background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(15px, 1.5vw, 19px)',
                  lineHeight: 1.4, color: theme.base,
                }}>
                  <strong style={{ fontWeight: 700 }}>{p.bold}</strong>{p.rest}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
