import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const items = [
  {
    title: 'Dedicated Coach',
    desc: 'Work in small groups with a dedicated leadership coach guiding your development and performance.',
  },
  {
    title: '2 × Executive Roundtables',
    desc: 'Engage directly with visiting senior or executive leaders during the programme to present ideas, gain insight, and be challenged on your thinking.',
  },
  {
    title: 'Capstone Presentation',
    desc: 'Present your project in a Dragons’ Den-style setting, demonstrating your thinking, decisions, and outcomes.',
  },
  {
    title: 'Leadership Profile',
    desc: 'Build a structured leadership profile through weekly accountability, evidence, and measurable progress.',
  },
  {
    title: '1:1 Support',
    desc: 'Receive targeted 1:1 coaching at key points to strengthen your approach and accelerate progress.',
  },
  {
    title: 'Flexible Delivery',
    desc: 'Participate online, in person, or hybrid, working within focused small groups.',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: fadeEase } },
};

export function CohortProgramme() {
  return (
    <section
      data-screen-label="Cohort Program Delivery"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['COHORT', 'PROGRAM', 'DELIVERY']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 0.75, letterSpacing: '-0.02em',
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        />

        <motion.p
          data-no-reveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: fadeEase, delay: 0.2 }}
          style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 1.55,
            color: theme.base,
            margin: '0 0 clamp(56px, 8vw, 96px)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            maxWidth: 820,
          }}
        >
          A cohort programme is right for you if you want the momentum of
          learning in a group, developing alongside others while strengthening
          your own performance. It suits those who value shared experience,
          team-based learning, and the opportunity to develop both themselves
          and others. It offers a more cost-effective pathway while maintaining
          structure, accountability, and clear progression.
        </motion.p>

        <div style={{
          height: 1, background: 'rgba(0,0,0,0.2)',
          marginBottom: 'clamp(40px, 6vw, 64px)',
        }} />

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 88px)' }}>
          <motion.div data-no-reveal variants={fadeUp}>
            <h3 style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(36px, 9.3vw, 120px)',
              lineHeight: 1, letterSpacing: '-0.02em',
              margin: 0,
              textTransform: 'uppercase',
              color: theme.base,
            }}>
              The Experience
            </h3>
          </motion.div>

          <motion.ul
            data-no-reveal
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(22px, 2.6vw, 32px)',
            }}
          >
            {items.map((it) => (
              <motion.li data-no-reveal
                key={it.title}
                variants={listItem}
                style={{
                  display: 'flex', alignItems: 'flex-start',
                  gap: 'clamp(16px, 2vw, 24px)',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 10, height: 10,
                    background: theme.ink,
                    marginTop: 8,
                  }}
                />
                <div>
                  <h4 style={{
                    fontFamily: theme.body, fontWeight: 700,
                    fontSize: 'clamp(17px, 1.8vw, 20px)',
                    lineHeight: 1.25, letterSpacing: '-0.005em',
                    margin: '0 0 8px',
                    color: theme.base,
                  }}>{it.title}</h4>
                  <p style={{
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    lineHeight: 1.6, margin: 0,
                    color: theme.subtitle,
                  }}>{it.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </Group>
      </div>
    </section>
  );
}
