import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme, fadeUp, cardStagger, cardRise } from '../../theme';
import { Group } from '../primitives/Reveal';
import { ParallaxImage } from '../primitives/ParallaxImage';
import { SplitHeading } from '../primitives/SplitHeading';
import { Magnetic } from '../Magnetic';

const groups = [
  {
    title: 'Career Entry & Professional Development',
    age: 'Ages 19+',
    img: '/assets/right-for-me-2.webp',
    highlight:
      'We know exactly what employers look for. We train and guide you to demonstrate it through your professional profile, interview responses and project evidence, helping you overcome your individual roadblocks and stand out as an emerging leader in your field.',
    bullets: [
      'I have an idea, interest, or industry problem I want to develop into a project I can showcase in interviews',
      'I want to stand out in competitive interviews',
      'I want to build credibility quickly in professional environments',
      'I want to communicate with confidence and presence',
      'I’m stepping into higher expectations and want to perform strongly',
      'I’m more introverted, but want to develop confidence as a leader',
      'I want to feel equipped, capable, and ready for the workplace',
    ],
  },
  {
    title: 'University Entrance & Academic Progression',
    age: 'Ages 16+',
    img: '/assets/ALL NEW IMAGES/2.webp',
    highlight:
      'We help you develop and demonstrate the leadership to be seen as an emerging leader in your chosen field. By leading a relevant project shaped around your interests, you build the evidence and confidence to stand out in applications and interviews.',
    bullets: [
      'I’m academically capable but unsure how to truly stand out',
      'I have an idea related to my chosen degree that I want to develop and showcase through a leadership project',
      'I want to demonstrate my leadership to strengthen my university applications',
      'I lack confidence in interviews or high-pressure situations',
      'I want to build something meaningful alongside my studies',
      'I want to communicate myself more confidently',
      'I want to meet like-minded people who are pushing themselves forward',
    ],
  },
  {
    title: 'School Entrance & Early Leader Foundations',
    age: 'Ages 11+',
    img: '/assets/new/pic-body-text.webp',
    highlight:
      'We help you discover what you stand for and build the confidence to be seen as a young person with leadership potential. By leading a project shaped around what matters to you, you create achievements to be proud of and evidence that helps you stand out in school applications, interviews and future opportunities.',
    bullets: [
      'I want more confidence in myself',
      'I want to become more focused, motivated, and disciplined',
      'I want to learn how to step up and lead',
      'I know I have strengths, but I’m not using them fully yet',
      'I have an idea for a project and want to showcase it in a school application',
      'I want to stand out in opportunities available to me',
    ],
  },
];

function Card({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      variants={cardRise}
      data-no-reveal
      className="xg-glass-solid xg-lift"
      style={{
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', borderRadius: 8,
      }}
    >
      <ParallaxImage
        src={group.img}
        alt={group.title}
        style={{ width: '100%', aspectRatio: '1/1' }}
      />

      <div style={{
        padding: 'clamp(22px, 2.6vw, 32px)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(14px, 1.6vw, 20px)',
        flex: 1,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: theme.subtitle, fontWeight: 600,
        }}>{group.age}</div>

        <h3 style={{
          fontFamily: theme.display, fontWeight: 800,
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          lineHeight: 1.1, letterSpacing: '-0.005em',
          margin: 0,
          textTransform: 'uppercase',
          color: theme.base,
        }}>{group.title}</h3>

        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          lineHeight: 1.6, margin: 0,
          color: theme.subtitle,
        }}>{group.highlight}</p>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-cursor="grow"
          style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%',
            padding: '14px 0',
            background: 'transparent', color: theme.base,
            border: 'none',
            borderTop: `1px solid ${theme.borderDark}`,
            fontSize: 13, letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer', fontWeight: 500,
          }}
        >
          <span>{open ? 'Hide details' : 'Is this right for me?'}</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 18, lineHeight: 1,
              transform: open ? 'rotate(45deg)' : 'rotate(0)',
            }}
          >+</span>
        </button>

        {open && (
          <div style={{ overflow: 'hidden' }}>
            <ul style={{
              listStyle: 'none', margin: 0, padding: '4px 0 0',
              display: 'flex', flexDirection: 'column',
              gap: 12,
            }}>
              {group.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    fontSize: 'clamp(13px, 1.4vw, 14px)',
                    lineHeight: 1.55,
                    color: theme.base,
                  }}
                >
                  <span aria-hidden style={{
                    flexShrink: 0,
                    width: 5, height: 5, borderRadius: '50%',
                    background: theme.dark, marginTop: '0.55em',
                  }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  );
}


export function IsThisRightForMe() {
  return (
    <section
      data-screen-label="Is This Right For Me"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group className="xg-exp-heading-block" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <SplitHeading
            lines={[
              <span className="xdge-right-for-me-kicker">
                THINK YOU&rsquo;RE NOT THE{' '}
                <span className="xdge-right-for-me-solid">&lsquo;LEADERSHIP TYPE&rsquo;?</span>
              </span>,
            ]}
            lineClipClasses={['xdge-right-for-me-clip']}
            style={{
              fontFamily: theme.displayCondensed,
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          />
          <motion.div data-no-reveal variants={fadeUp} className="xg-right-for-me-cta" style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: 24, marginTop: 'clamp(24px, 3vw, 40px)',
          }}>
            <div className="xg-right-for-me-cta-copy" style={{ maxWidth: 480, textAlign: 'right' }}>
              <p style={{
                fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
                color: theme.base, margin: '0 0 18px',
              }}>
                Not sure if this is right for you?
              </p>
              <Magnetic strength={0.3}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '12px 20px',
                    border: `1px solid ${theme.base}`, borderRadius: 999,
                    color: theme.base, textDecoration: 'none',
                    fontSize: 13, fontWeight: 500,
                  }}
                >
                  Schedule A Call With Us <span style={{ fontSize: 16 }}>→</span>
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </Group>

        <Group
          className="xg-3"
          variants={cardStagger}
          style={{
            gap: 'clamp(20px, 2.4vw, 28px)',
            alignItems: 'stretch',
          }}
        >
          {groups.map((g, i) => (
            <Card key={g.title} group={g} index={i} />
          ))}
        </Group>
      </div>
    </section>
  );
}
