import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { ParallaxImage } from '../primitives/ParallaxImage';
import { useScrollLock } from '../../hooks/useScrollLock';

const slides = [
  {
    age: 'Ages 19+',
    eyebrow: 'Career Entry & Professional Development',
    headlineLines: ['CAREER ENTRY &', 'PROFESSIONAL DEVELOPMENT'],
    focus: 'Performance, credibility, and impact',
    description:
      'Delivered at a professional standard aligned to the workplace. Builds credibility, sharpens execution, and develops the communication and judgement required for early career roles.',
    experience: [
      'Delivered at a professional standard aligned to the workplace',
      'Builds credibility for interviews, internships, and early roles',
      'Develops communication, judgement, and execution skills',
      'Applies learning to real-world challenges',
    ],
    project: [
      'Work on real-world business or leadership challenges',
      'Present ideas, solutions, and recommendations clearly',
      'Build a portfolio of work that demonstrates capability',
      'Develop evidence of impact to use in interviews and early career roles',
    ],
    img: '/assets/ALL NEW IMAGES/14.webp',
  },
  {
    age: 'Ages 16+',
    eyebrow: 'University & Academic Progression',
    headlineLines: ['UNIVERSITY &', 'ACADEMIC PROGRESSION'],
    focus: 'Standing out in competitive environments',
    description:
      'Prepares students for university applications and competitive academic environments. Builds the articulation, presence, and personal positioning that selective institutions look for.',
    experience: [
      'Prepares students for university applications and interviews',
      'Builds confidence, articulation, and personal presence',
      'Develops readiness for competitive academic environments',
    ],
    project: [
      'Create and present structured projects linked to interests or future goals',
      'Develop clear thinking, communication, and positioning',
      'Build strong material for personal statements and interviews',
      'Practise presenting ideas with confidence and credibility',
    ],
    img: '/assets/ALL NEW IMAGES/Untitled design (57).jpg',
  },
  {
    age: 'Ages 11–16',
    eyebrow: 'School Entry & Early Leadership',
    headlineLines: ['SCHOOL ENTRY &', 'EARLY LEADERSHIP'],
    focus: 'Confidence, habits, and early leadership behaviours',
    description:
      'Engaging, interactive, and practical — introduces leadership in a relatable way. Builds the confidence, communication, and early habits that shape how young people show up.',
    experience: [
      'Delivered through engaging, interactive activities',
      'Introduces leadership in a practical and relatable way',
      'Builds confidence, communication, and early habits',
    ],
    project: [
      'Work on simple, structured projects to build confidence',
      'Share ideas and present in a supportive environment',
      'Practise teamwork, responsibility, and follow-through',
      'Begin developing the confidence to speak up and contribute',
    ],
    img: '/assets/experience-card-3.webp',
  },
];

function Bullets({ items, dark }) {
  return (
    <ul style={{
      listStyle: 'none', margin: 0, padding: 0,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {items.map((b) => (
        <li
          key={b}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            lineHeight: 1.55,
            color: dark ? theme.subtitle : theme.subtitle,
          }}
        >
          <span aria-hidden style={{
            flexShrink: 0,
            width: 5, height: 5, borderRadius: '50%',
            background: dark ? theme.base : theme.ink,
            marginTop: '0.55em',
          }} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Modal({ slide, onClose }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div data-no-reveal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 60%), rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
      }}
    >
      <motion.div data-no-reveal
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          background: theme.dark,
          color: theme.base,
          maxWidth: 1100, width: '100%',
          boxShadow: '0 60px 120px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
          maxHeight: '90vh', overflowY: 'auto',
          padding: 'clamp(28px, 4vw, 56px)',
        }}
      >
        <button
          onClick={onClose}
          data-cursor="grow"
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 'clamp(16px, 2vw, 24px)',
            right: 'clamp(16px, 2vw, 24px)',
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.2)',
            background: 'transparent', color: theme.base,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        ><CloseIcon /></button>

        <div style={{
          fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: theme.subtitle, fontWeight: 700,
          marginBottom: 18,
        }}>
          {slide.age} · {slide.eyebrow}
        </div>

        <h2 style={{
          fontFamily: theme.display, fontWeight: 900,
          fontSize: 'clamp(48px, 8.3vw, 96px)',
          lineHeight: 0.95, letterSpacing: '-0.02em',
          margin: '0 0 clamp(24px, 4vw, 40px)',
          color: theme.base,
          textTransform: 'uppercase',
        }}>
          {slide.headlineLines.map((l) => (<span key={l} style={{ display: 'block' }}>{l}</span>))}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 'clamp(28px, 4vw, 64px)',
          alignItems: 'flex-start',
        }} className="xg-ages-slide">
          <div>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.55,
              color: theme.base,
              margin: '0 0 clamp(24px, 3vw, 36px)',
              fontWeight: 500,
              maxWidth: 560,
            }}>{slide.description}</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(20px, 3vw, 40px)',
            }} className="xg-ages-modal-bullets">
              <div>
                <div style={{
                  fontSize: 11, letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: theme.subtitle,
                  marginBottom: 14, fontWeight: 700,
                }}>Experience</div>
                <Bullets items={slide.experience} />
              </div>
              <div>
                <div style={{
                  fontSize: 11, letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: theme.subtitle,
                  marginBottom: 14, fontWeight: 700,
                }}>Project Application</div>
                <Bullets items={slide.project} />
              </div>
            </div>
          </div>

          <aside style={{
            border: '1px solid rgba(0,0,0,0.18)',
            background: 'rgba(255,255,255,0.5)',
            padding: 'clamp(22px, 2.5vw, 32px)',
          }}>
            <div style={{
              fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: theme.subtitle, fontWeight: 700,
              marginBottom: 16,
            }}>Focus</div>
            <div style={{
              fontFamily: theme.display, fontWeight: 800,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              lineHeight: 1.15, letterSpacing: '-0.005em',
              textTransform: 'uppercase',
              color: theme.base,
            }}>{slide.focus}</div>
          </aside>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function Card({ slide, onOpen, dark }) {
  const bg = dark ? theme.ink : theme.base;
  const titleColor = dark ? theme.base : theme.ink;
  const tagColor = dark ? theme.subtitle : theme.subtitle;
  const subColor = dark ? theme.subtitle : theme.subtitle;
  const ctaColor = dark ? theme.base : theme.ink;
  const borderColor = dark ? theme.borderDark : 'rgba(0,0,0,0.2)';
  const imgBg = dark ? theme.dark : '#000000';

  return (
    <motion.button data-no-reveal
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      data-cursor="grow"
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        textAlign: 'left',
        background: bg,
        color: titleColor,
        border: `1px solid ${borderColor}`,
        padding: 0,
        cursor: 'pointer',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <ParallaxImage
        src={slide.img}
        alt=""
        style={{ width: '100%', aspectRatio: '1 / 1', background: imgBg }}
      />

      <div style={{
        padding: 'clamp(22px, 2.6vw, 32px)',
        display: 'flex', flexDirection: 'column',
        gap: 14,
        flex: 1,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: tagColor, fontWeight: 700,
        }}>{slide.age}</div>

        <h3 style={{
          fontFamily: theme.display, fontWeight: 800,
          fontSize: 'clamp(22px, 2.4vw, 30px)',
          lineHeight: 1.05, letterSpacing: '-0.01em',
          margin: 0,
          textTransform: 'uppercase',
          color: titleColor,
        }}>{slide.eyebrow}</h3>

        <div style={{
          fontSize: 13, color: subColor,
          lineHeight: 1.5,
        }}>{slide.focus}</div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 'auto', paddingTop: 6,
          fontSize: 12, letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: ctaColor, fontWeight: 600,
        }}>
          View Details <span style={{ fontSize: 16 }}>→</span>
        </div>
      </div>
    </motion.button>
  );
}

export function DifferentAgesDifferentFocus() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      data-screen-label="Different Ages, Different Focus"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="xg-exp-heading-block">
        <SplitHeading
          lines={[
            <span className="xdge-differs-solid">HOW XDGE DIFFERS BY</span>,
            <span className="xdge-differs-bottom-line">
              <span className="xdge-differs-hollow">AGE</span>
              <span className="xdge-amp-box">&</span>
              <span className="xdge-differs-hollow">OUTCOMES?</span>
            </span>,
          ]}
          lineClipClasses={['xdge-differs-clip', 'xdge-differs-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        />

        <motion.p
          className="xg-section-lede"
          data-no-reveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: 1.45,
            color: theme.base,
            margin: '0 0 clamp(48px, 7vw, 80px)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            maxWidth: 820,
          }}
        >
          This is not the same programme repeated at different ages. Each stage
          is designed around where students are and what they are working towards next.
        </motion.p>
        </div>

        <Group
          className="xg-3"
          style={{
            gap: 'clamp(20px, 2.4vw, 28px)',
            alignItems: 'stretch',
          }}
        >
          {slides.map((slide, i) => (
            <Card key={slide.age} slide={slide} onOpen={() => setOpenIndex(i)} dark={true} />
          ))}
        </Group>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Modal slide={slides[openIndex]} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
