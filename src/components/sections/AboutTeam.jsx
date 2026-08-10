import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const team = [
  {
    name: 'Nicola Mann',
    role: 'Founder · Behavioural Scientist · Leadership Development Expert',
    credential: 'MSc',
    img: '/assets/team-nicola.webp',
    intro: 'Nicola Mann is a behavioural scientist, leadership specialist, and educator with over 20 years of experience developing leaders, teams, and high performers across the UK, Europe, Asia, and the USA.',
    more: 'Beginning her career as a teacher before lecturing on MBA and graduate business programmes at Heriot-Watt and Sunderland University, Nicola brings a unique blend of education, behavioural science, and real-world leadership development to XDGE. Her passion is helping people build the personal, professional, and practical leadership skills they need to grow in confidence, seize opportunities, and thrive in what comes next.',
  },
  {
    name: 'Dr. Dawne Dickerson',
    role: 'Clinical Research Analyst · Public Health',
    credential: 'PhD',
    img: '/assets/team-dawne.webp',
    intro: 'Dr. Dawne Dickerson is an experienced clinical research analyst at a Fortune 100 pharmaceutical company, holding a doctorate in Public Health with a concentration in epidemiology. With over a decade of clinical development experience spanning from pre-clinical to late-phase development, and with three drug approvals under her belt, she was recently honored as part of The Who’s Who of America 2024 class for her contributions to her field.',
    more: '',
  },
  {
    name: 'David Boyd',
    role: 'Hospitality Leader · Educator',
    credential: 'MEd',
    img: '/assets/team-david.webp',
    intro: 'David Boyd is a seasoned hospitality leader, quality assurance expert, and educator with extensive international experience across luxury hospitality, leadership development, and academic excellence.',
    more: 'Recognised by senior leaders across the global hotel industry, David has managed high-end hospitality organisations across the Middle East and the United Kingdom and served as Head of Department for Bournemouth University’s distinguished Hospitality and Tourism Honours programme. Through XDGE, David brings deep real-world leadership experience, commercial insight, and a passion for helping young people develop the professional skills, confidence, and standards needed to thrive in competitive industries.',
  },
  {
    name: 'Dr. Eugene Livshits',
    role: 'Pharmaceutical Executive · Scientist',
    credential: 'PhD',
    img: '/assets/team-eugene.webp',
    intro: 'Dr. Eugene Livshits is a pharmaceutical executive, scientist, and mentor with over 25 years of international experience in product development, regulatory compliance, quality, and manufacturing leadership. A PhD chemist and former senior executive, he has helped global organisations navigate complex technical environments and build high-performing teams.',
    more: 'Fluent in English, Russian, and German, Eugene supports students and aspiring professionals interested in pharmaceutical, life sciences, chemistry, and regulated industry careers, helping them strengthen university applications, understand industry expectations, and build the confidence and career readiness needed for competitive pathways.',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: fadeEase } },
};

function Bio({ intro, more }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p style={{
        fontSize: 'clamp(14px, 1.5vw, 16px)',
        lineHeight: 1.65, margin: 0,
        color: theme.subtitle,
      }}>{intro}</p>

      {more && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            data-cursor="grow"
            style={{
              marginTop: 14,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: 0,
              background: 'transparent', border: 'none',
              color: theme.base,
              fontSize: 12, letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {open ? 'Read Less' : 'Read More'}
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ display: 'inline-flex', fontSize: 16, lineHeight: 1 }}
            >+</motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div data-no-reveal
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  lineHeight: 1.65, margin: '12px 0 0',
                  color: theme.subtitle,
                }}>{more}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function Avatar({ src, alt }) {
  return (
    <div
      className="xg-team-avatar"
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 35%',
          display: 'block',
        }}
      />
    </div>
  );
}

export function AboutTeam() {
  return (
    <section
      data-screen-label="The Team"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          tag="h2"
          lines={[
            <>
              <span className="xdge-team-the">THE</span>
              <span className="xdge-team-team">TEAM</span>
            </>,
          ]}
          lineClipClasses={['xdge-team-heading-clip']}
          lineInnerClasses={['xdge-team-heading-line']}
          style={{
            fontFamily: theme.displayCondensed,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 1,
            marginBottom: 'clamp(40px, 6vw, 72px)',
            textAlign: 'left',
          }}
        />

        <div className="xg-team-grid">
          {team.map((m, i) => (
            <motion.div data-no-reveal
              key={m.name}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="xg-team-row"
            >
              {/* Col 1: intro (first row only; empty cell keeps desktop columns aligned) */}
              <div className="xg-team-intro">
                {i === 0 ? (
                  <>
                    <p style={{
                      fontFamily: theme.italic, fontStyle: 'italic',
                      fontSize: 'clamp(18px, 1.9vw, 22px)',
                      lineHeight: 1.4,
                      color: theme.base, margin: '0 0 clamp(24px, 3vw, 32px)',
                      fontWeight: 500,
                    }}>
                      Meet the XDGE core team — senior leaders dedicated to
                      developing high-performing individuals.
                    </p>
                    <div style={{
                      fontSize: 14, lineHeight: 1.7,
                      color: theme.subtitle,
                    }}>
                      <div>4 Core Experts</div>
                      <div>15+ Years senior leadership each</div>
                      <div>Master’s & PhD qualified</div>
                      <div>Global network of speakers</div>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Col 2: image */}
              <div className="xg-team-image">
                <Avatar src={m.img} alt={m.name} />
              </div>

              {/* Col 3: name + role + bio */}
              <div className="xg-team-text">
                <h3 style={{
                  fontFamily: theme.body, fontWeight: 700,
                  fontSize: 'clamp(20px, 2vw, 24px)',
                  lineHeight: 1.2, letterSpacing: '-0.005em',
                  margin: '0 0 6px',
                  color: theme.base,
                }}>{m.name}</h3>
                <div style={{
                  fontSize: 14, color: theme.subtitle,
                  marginBottom: 'clamp(18px, 2.4vw, 24px)',
                  lineHeight: 1.4,
                }}>{m.role} · {m.credential}</div>
                <Bio intro={m.intro} more={m.more} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
