import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const items = [
  {
    title: 'Fully Customised',
    desc: 'A programme built around your style, goals, challenges, strengths, and development needs to prepare you for your next level.',
  },
  {
    title: 'Dedicated Coach',
    desc: 'Work 1:1 with an expert leadership coach who trains, challenges, and guides your development.',
  },
  {
    title: 'Specialised Practice',
    desc: 'Focused preparation embedded into your programme, including interviews, applications, and high-stakes scenarios.',
  },
  {
    title: '2 × Executive Roundtables',
    desc: 'Engage directly with visiting senior or executive leaders in groups up to four participants, presenting your thinking and being challenged at a higher level.',
  },
  {
    title: 'Leadership Profile',
    desc: 'Build a professional leadership profile with clear, evidence-based progression aligned to the standard required for your next level.',
  },
  {
    title: 'Performance Acceleration',
    desc: 'Receive continuous feedback, challenge, and accountability to raise your standard and accelerate your results.',
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

export function IndividualProgramme() {
  return (
    <section
      data-screen-label="Individual Program Experience"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['INDIVIDUAL', 'PROGRAM', 'EXPERIENCE']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            // Capped below the usual 200px: this line is nowrap inside a container that
            // stops at maxWidth 1280 while 11.3vw keeps growing, so past a ~1770px
            // viewport it overflowed and the clip shaved the end off — "EXPERIENCE" measured 1289px against 1280px.
            fontSize: 'clamp(40px, 11.3vw, 180px)',
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
          An individual programme is right for you if you want a fully tailored
          experience built around how you think, operate, and perform. It is
          designed around your style, personality, strengths, and goals, with a
          clear focus on preparing you for your next level. It suits those who
          perform best in a personalised setting and want direct coaching,
          focused development, and a structured path to accelerate results.
        </motion.p>

        <div style={{
          height: 1, background: 'rgba(255,255,255,0.2)',
          marginBottom: 'clamp(40px, 6vw, 64px)',
        }} />

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 88px)' }}>
          <div data-reveal>
            <h3 style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(36px, 9.3vw, 120px)',
              lineHeight: 1, letterSpacing: '-0.02em',
              margin: 0,
              textTransform: 'uppercase',
              color: theme.base,
            }}>
              Inside The Programme
            </h3>
          </div>

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
                    background: theme.dark,
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
