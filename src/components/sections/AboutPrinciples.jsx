import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Reveal } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const principles = [
  {
    n: '01',
    title: 'Our Approach',
    body: 'XDGE is led by senior leaders, leadership development specialists, and industry professionals with over 20 years of experience developing high performance in individuals, teams, and organisations. We bring the calibre of leadership development typically reserved for professionals and executives, translating it into engaging, practical experiences that prepare young people for the real world.',
    img: '/assets/ALL NEW IMAGES/12.webp',
  },
  {
    n: '02',
    title: 'From Learning To Performance',
    body: 'Too many programmes focus on knowledge and assume results will follow. We know there is a gap between learning and performance, and we are built to close it. Through meaningful projects, real challenges, and practical application, young people develop leadership, confidence, and professional capability through passion-driven projects they genuinely care about — giving them a reason to step forward, take ownership, and lead.',
    img: '/assets/ALL NEW IMAGES/3.webp',
  },
  {
    n: '03',
    title: 'Our Belief',
    body: 'We are driven by one belief: young people are capable of far more than they realise. They should see themselves as professionals and leaders long before titles are given.',
    img: '/assets/principle-3.webp',
  },
  {
    n: '04',
    title: 'Our Standard',
    body: 'We thrive in the moments where individuals and teams rise to a new level of performance. We work alongside individuals to remove limitations, create clarity, and move forward with purpose. We exist to help people reach their next level. Our focus is not just improvement — it is transformation.',
    img: '/assets/ALL NEW IMAGES/10.webp',
  },
  {
    n: '05',
    title: 'The Moment That Matters',
    body: 'Many people never experience the moment where everything shifts — the moment they realise they are capable of far more than they ever believed. That moment changes confidence. It changes ambition. It changes performance. XDGE was built to create those moments early, in the foundational years where belief, identity, and leadership capability can shape everything that comes next.',
    img: '/assets/ALL NEW IMAGES/13.webp',
  },
];

export function AboutPrinciples() {
  // Any-pixel latch, matching every other reveal on the site.
  const introRef = useRef(null);
  const introSeen = useInView(introRef, { once: true });

  return (
    <section
      data-screen-label="Why XDGE"
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
        <div style={{ position: 'relative' }}>
          <SplitHeading
            tag="h2"
            lines={[
              <span className="xdge-why-heading-line">
                <span className="xdge-why-solid">WHY </span>
                <span className="xdge-why-hollow">XDGE</span>
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
        </div>

        <motion.div data-no-reveal
          className="xg-principles-intro"
          variants={fadeUp}
          initial="hidden"
          animate={introSeen ? 'visible' : 'hidden'}
          style={{
            display: 'flex', flexDirection: 'column',
            gap: 10,
            marginBottom: 'clamp(48px, 7vw, 88px)',
            maxWidth: 640,
          }}
        >
          <div style={{
            fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: theme.subtitle, fontWeight: 700,
            marginBottom: 14,
          }}>
            Who Are We
          </div>
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 1.55,
            color: theme.base, margin: 0,
            fontWeight: 500,
          }}>
            A clear set of beliefs defines how we think, how we work, and how we
            develop leaders. These principles shape every programme, every
            experience, and every outcome we deliver.
          </p>
        </motion.div>

        <div className="xg-principles-list">
          {principles.map((p) => (
            // `Reveal` IS the row — the class goes on its motion.div, so the grid
            // layout is untouched and no wrapper is inserted.
            //
            // These five were on the global CSS engine, which gives every unit the
            // same 20px lift over 0.65s. Against the 48px `fadeUp` used everywhere
            // else that barely reads as movement, which is why this section looked
            // like it just switched on rather than animating. Reveal stamps
            // `data-no-reveal`, so ScrollReveal skips them and the two systems
            // cannot fight over opacity the way they did before.
            <Reveal
              key={p.n}
              className="xg-principle-row"
            >
              <div className="xg-principle-num" style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(36px, 10.5vw, 199.5px)',
                lineHeight: 0.9, letterSpacing: '-0.03em',
                color: theme.base,
              }}>{p.n}</div>

              <div className="xg-principle-text">
                <h3 style={{
                  fontFamily: theme.body, fontWeight: 700,
                  fontSize: 'clamp(22px, 2.4vw, 30px)',
                  lineHeight: 1.15, letterSpacing: '-0.005em',
                  margin: '0 0 16px',
                  color: theme.base,
                }}>{p.title}</h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  lineHeight: 1.65, margin: 0,
                  color: theme.subtitle,
                  maxWidth: 560,
                }}>{p.body}</p>
              </div>

              <div className="xg-principle-img">
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  background: '#000000',
                }}>
                  <img
                    src={p.img}
                    alt=""
                    loading="eager"
                    decoding="async"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
