import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { ParallaxImage } from '../primitives/ParallaxImage';

const formats = [
  {
    title: 'Individual 1:1',
    desc: '1:1 coaching with a dedicated leadership coach and consultant. All XDGE programmes are custom-built around you, your goals, and performance needs.',
    img: '/assets/who-we-are.webp',
  },
  {
    title: 'Cohort — Small Group',
    desc: 'Group-based programme with shared learning and light coaching support. Each participant develops a personal project in business, leadership, or innovation.',
    img: '/assets/experience-top-banner.webp',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: fadeEase } },
};

export function HowWeDeliver() {
  return (
    <section
      data-screen-label="How We Deliver"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['HOW WE', 'DELIVER']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 0.75, letterSpacing: '-0.02em',
            marginBottom: 'clamp(24px, 4vw, 36px)',
          }}
        />

        <motion.p
          data-no-reveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: fadeEase, delay: 0.2 }}
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: 1.4,
            color: theme.base,
            margin: '0 0 clamp(48px, 7vw, 80px)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            maxWidth: 720,
          }}
        >
          Most of our programmes are delivered in both formats.
        </motion.p>

        <Group className="xg-2" style={{ gap: 'clamp(28px, 4vw, 56px)', alignItems: 'stretch' }}>
          {formats.map((f) => (
            <motion.article
              key={f.title}
              data-no-reveal
              variants={cardVariants}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(20px, 2.5vw, 28px)',
              }}
            >
              <ParallaxImage
                src={f.img}
                alt={f.title}
                objectPosition="50% 40%"
                style={{ width: '100%', aspectRatio: '1 / 1', background: '#000000' }}
              />

              <div>
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 800,
                  fontSize: 'clamp(42px, 5.1vw, 66px)',
                  lineHeight: 1.05, letterSpacing: '-0.01em',
                  margin: '0 0 18px',
                  textTransform: 'uppercase',
                  color: theme.base,
                }}>{f.title}</h3>
                <p style={{
                  fontSize: 'clamp(15px, 1.6vw, 18px)',
                  lineHeight: 1.6, margin: 0,
                  color: theme.subtitle,
                  maxWidth: 540,
                }}>{f.desc}</p>
              </div>
            </motion.article>
          ))}
        </Group>
      </div>
    </section>
  );
}
