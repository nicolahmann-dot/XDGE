import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const testimonials = [
  {
    name: 'YS',
    role: 'Age 18 — University XDGE',
    headline: 'This programme pushed me far beyond anything I had done at school.',
    body: 'The professional skills sessions were the most useful because they taught me to think on my feet, answer difficult questions and present myself as someone credible.',
  },
  {
    name: 'WP',
    role: 'Age 15 — Junior MBA',
    headline: 'The Executive Roundtables were easily the best part for me.',
    body: 'At first, I was nervous but I actually enjoyed it and it felt like a real professional meeting and showed me that I could hold my own in that kind of room.',
  },
  {
    name: 'KR',
    role: 'Age 23 — Career XDGE',
    headline: 'I had felt completely out of my depth in my first job, like everyone else understood this professional world and I didn’t.',
    body: 'What helped most on this programme was having an amazing coach and building my own playbook and actually practising how to manage myself, organise my work and communicate properly.',
  },
  {
    name: 'JH',
    role: 'Age 24 — Career XDGE',
    headline: 'The best part was that my project focused on a real problem at the company I already worked for.',
    body: 'It gave me some extra credibility because my team and supervisor could see what I was capable of and the value I could bring to them.',
  },
  {
    name: 'Parent',
    role: 'University XDGE',
    headline: 'I really don’t think she would have secured the scholarship without the programme.',
    body: 'The panel said they could clearly see what she would bring to the university, and I honestly believe her project and the way she learned to present herself made the difference.',
  },
  {
    name: 'JB',
    role: 'Age 17 — College Incubator Programme',
    headline: 'The best part of the Incubator was having to go out and meet people in the real world and do the kind of work marketing professionals actually do.',
    body: 'It definitely pushed me out of my comfort zone, but I felt really buzzed by it and proud of what I achieved.',
  },
  {
    name: 'GS',
    role: 'Age 21 — Career XDGE',
    headline: 'I really think my project helped me get the job because I had spent so much time analyzing the manufacturing failures in the industry and talking about what could be done to remedy them.',
    body: 'The interview stopped feeling like an interview and turned into a proper conversation. I think they could see that I would fit in and was ready to help the company, rather than just looking for any job.',
  },
  {
    name: 'PL',
    role: 'Age 11 — School XDGE',
    headline: 'I never thought I could be a leader because I am quiet and shy.',
    body: 'I learned how to change my thinking and it showed me that people can listen to my ideas without me being loud.',
  },
  {
    name: 'FK',
    role: 'Age 17 — College Incubator',
    headline: 'The Guild X day was definitely the best part for me.',
    body: 'It was amazing to get real feedback and recognition for what I had achieved. It was also really good to see how far we had all come.',
  },
  {
    name: 'DB',
    role: 'Age 14 — School XDGE',
    headline: 'It helped me see what I am good at and make a plan for what I want in life.',
    body: 'It was amazing to work with real leaders and learn about all the different ways they got there.',
  },
  {
    name: 'EN',
    role: 'Age 14 — School XDGE',
    headline: 'It definitely helped me become a prefect.',
    body: 'I found the professional skills part of the course most helpful because it helped me understand how to lead and gave me lots of practice speaking to adults and in public.',
  },
  {
    name: 'HG',
    role: 'Age 18 — University XDGE',
    headline: 'What made the programme so good for me was that my mentor helped me find a real problem in the pharmaceutical industry that I was actually interested in.',
    body: 'She motivated me a lot and kept pushing me to think further, so I wanted to work on it in my own time too. Having something to complete every week helped keep me on track. It was challenging, but it felt like I was a professional in the real world.',
  },
  {
    name: 'IH',
    role: 'Age 19 — University XDGE',
    headline: 'The part I found most useful was learning how to present myself and my ideas in a more professional way.',
    body: 'Using the right business language helped me present my project properly and really impressed the panel. I was also able to answer their questions without getting thrown off. It made me feel much more credible and less like I was just a school student.',
  },
  {
    name: 'BC',
    role: 'Age 21 — University XDGE',
    headline: 'I had always wanted to study abroad, but honestly didn’t know how I was meant to stand out.',
    body: 'Nicola really changed how I saw myself, especially when I was under pressure. She helped me realise where I was underselling myself and pushed me to take my research project much further than I probably would have on my own. The programme made me think more seriously about the kind of leadership role I want to work towards after graduate school.',
  },
  {
    name: 'ML',
    role: 'Parent — University XDGE',
    headline: 'The biggest difference the programme made was giving my son a real sense of direction.',
    body: 'He realised that being intelligent wasn’t enough unless he actually put it into action. Seeing him become so motivated by his project was a big change, and hearing him speak professionally with adults was something I never expected. He has now found a path that genuinely interests him and has real focus on what he needs to do to get into a good university.',
  },
  {
    name: 'Parent',
    role: 'University XDGE',
    headline: 'We thought carefully about the cost and time commitment, but the personal support made it worthwhile.',
    body: 'It wasn’t something my son simply attended and forgot about. Seeing the change in his confidence, focus and direction, and then seeing him secure his university place, made it feel like a real investment for his adult life.',
  },
  {
    name: 'SF',
    role: 'Age 25 — Career XDGE',
    headline: 'The project made a real difference because it was designed to support the strategy for improving engagement and morale in my team.',
    body: 'It got me a lot of recognition at work and helped me secure a place on the company’s leadership programme. I would definitely recommend it to anyone who wants to make their mark and move into leadership.',
  },
  {
    name: 'AV',
    role: 'Age 20 — Career XDGE',
    headline: 'There were a lot of “aha” moments, but what stayed with me most was being told on the first day that we were accountable to everyone in the room.',
    body: 'I didn’t really understand what that meant at first, but it taught me that leadership isn’t just about doing well yourself but also getting the whole team through. We all helped each other with the things we weren’t as good at. That definitely stuck with me.',
  },
  {
    name: 'Parent',
    role: 'School XDGE',
    headline: 'I wasn’t sure whether an online programme would feel personal enough, but that was never an issue.',
    body: 'The sessions were very interactive and her coach knew exactly what she was working on, what she found difficult and when to push her.',
  },
  {
    name: 'TP',
    role: 'Age 21 — Career XDGE',
    headline: 'There were several interviews and skills tests, and before the programme I wouldn’t have known what they were really assessing or how to approach them.',
    body: 'It gave me a real sense of the professional world and what would be expected of me before I had actually entered it.',
  },
  {
    name: 'LS',
    role: 'Age 18 — Incubator Programme',
    headline: 'The project helped me have a level of fluency that made answering their questions much easier.',
    body: '',
  },
  {
    name: 'PB',
    role: 'Age 17 — School XDGE',
    headline: 'Having a coach who really understood me made a huge difference.',
    body: 'The advice never felt general because it was based on my personality, goals and the things I found difficult.',
  },
  {
    name: 'OV',
    role: 'Age 15 — School XDGE',
    headline: 'Working on my default thinking and self-limiting habits probably changed me the most.',
    body: 'I started noticing how quickly I would tell myself I couldn’t do something or wasn’t ready. I think this has changed me a lot as a person as well as changed how I feel about success.',
  },
  {
    name: 'MA',
    role: 'Age 13 — School XDGE',
    headline: 'It was amazing to have real leaders talk through my project with me and be interested in my ideas and what I wanted to do.',
    body: '',
  },
];

const fadeEase = [0.22, 1, 0.36, 1];

const arrowProps = {
  width: 18, height: 18,
  viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const ArrowLeft = (
  <svg {...arrowProps}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
const ArrowRight = (
  <svg {...arrowProps}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);


export function ProvenOutcomes() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  const goNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const t = testimonials[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
  };
  return (
    <section
      data-screen-label="Proven Outcomes"
      data-section-theme="accent"
      style={{
        background: `url('/assets/reviews-bg.jpg') center/cover no-repeat`,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group className="xg-exp-heading-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 'clamp(40px, 6vw, 64px)', gap: 16 }}>
          <div>
            <SplitHeading
              lines={[<span className="xdge-reviews-hollow">REVIEWS</span>]}
              lineClipClasses={['xdge-reviews-clip']}
              style={{
                fontFamily: theme.displayCondensed,
                lineHeight: 0.75,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            />
          </div>
          <div data-reveal className="xg-section-lede-wrap" style={{ paddingBottom: 24, color: theme.base }}>
            <p className="xg-section-lede" style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55, margin: '0 0 12px', color: theme.base, fontWeight: 500 }}>
              What Young People And Parents Say About XDGE
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: theme.base, margin: 0, maxWidth: 480 }}>
              Real experiences from participants and families who have built
              their next step advantage through XDGE.
            </p>
          </div>
        </Group>

        {/* Pagination top row: counter | divider | arrows */}
        <div className="xg-outcomes-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(16px, 3vw, 32px)',
          paddingBottom: 'clamp(28px, 4vw, 40px)',
        }}>
          <div style={{
            fontSize: 13,
            color: theme.base,
            fontWeight: 600,
            letterSpacing: '0.04em',
            minWidth: 56,
          }}>
            {String(index + 1).padStart(2, '0')} - {String(total).padStart(2, '0')}
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.18)' }} />
          <div className="xg-outcomes-nav-btns" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="grow"
              aria-label="Previous review"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '16px 28px',
                borderRadius: 999,
                border: `1px solid ${theme.base}`,
                background: 'transparent',
                color: theme.base,
                fontSize: 14, fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ display: 'inline-flex', fontSize: 18 }}>{ArrowLeft}</span>
              Previous Review
            </motion.button>
            <motion.button
              onClick={goNext}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="grow"
              aria-label="Next review"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '16px 28px',
                borderRadius: 999,
                border: 'none',
                background: theme.base,
                color: theme.ink,
                fontSize: 14, fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              See More Reviews
              <span style={{ display: 'inline-flex', fontSize: 18 }}>{ArrowRight}</span>
            </motion.button>
          </div>
        </div>

        {/* Testimonial card */}
        <div style={{ position: 'relative', minHeight: 'clamp(320px, 40vw, 380px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: fadeEase }}
              data-no-reveal
              className="xg-outcomes-card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 200px) 1fr',
                gap: 'clamp(32px, 6vw, 80px)',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 'clamp(42px, 4.5vw, 66px)',
                  lineHeight: 1, letterSpacing: '-0.01em',
                  margin: '0 0 10px',
                  color: theme.base,
                }}>{t.name}</h3>
                <div style={{
                  fontSize: 13, lineHeight: 1.5,
                  color: theme.base,
                }}>{t.role}</div>
              </div>

              <div>
                <p className="xg-outcomes-quote">
                  {t.headline}
                </p>
                {t.body ? (
                  <p className="xg-outcomes-body">
                    {t.body}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
