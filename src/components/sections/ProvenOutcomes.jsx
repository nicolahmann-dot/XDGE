import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const testimonials = [
  {
    name: 'DB',
    role: 'Age 21 — Career Edge Programme',
    headline: 'Having a coach who genuinely understood me made a huge difference.',
    body: "My coach didn't try to turn me into someone else. She took the time to understand who I was, what I was good at, and where I was holding myself back. She challenged me when I needed it, supported me when I doubted myself, and never let me settle for less than I was capable of. Looking back, having someone who saw more in me than I could see in myself made a bigger difference than I realised at the time.",
  },
  {
    name: 'SW',
    role: 'Age 21 — Career Edge Programme 2026',
    headline: 'The Executive Round Tables were probably my favourite part of the programme.',
    body: 'It was really interesting hearing successful people talk honestly about their careers, mistakes, and what they had learned along the way. It felt like a genuine conversation. I came away with a much better understanding of what leadership actually looks like in the real world.',
  },
  {
    name: 'SG',
    role: 'Age 18 — University Edge Programme 2024',
    headline: 'It genuinely changed how I think, not just what I know.',
    body: 'Coming in, I expected to just to learn about what leaders do. What surprised me most was how much it changed the way I see myself. I have become better at handling challenges, criticism, and failure. It’s now easier to step outside my comfort zone.',
  },
  {
    name: 'CL',
    role: 'Age 23',
    headline: "It felt like having access to a professional network before I'd even started my career.",
    body: 'One of the best parts was meeting so many different coaches, leaders, and professionals throughout the programme. Hearing about their experiences and getting advice on my own project made everything feel much more real. It was learning from people who had actually done it — I feel like the exposure and support prepared me for the workplace better than a lot of what I learned at university.',
  },
  {
    name: 'Parent',
    role: 'Parent of Age 11 Student',
    headline: 'Our son became more confident in a matter of weeks.',
    body: 'The changes were quite subtle at first, but they added up quickly. He started speaking up more, taking ownership of things, and showing more confidence in himself. What stands out most is how he talks about his future now.',
  },
  {
    name: 'TV',
    role: 'Age 17 — University Edge Programme',
    headline: 'I always thought leadership was for other people.',
    body: "I've never been someone who likes being the centre of attention, so I never really saw myself as a leader. The programme helped me realise that leadership is more about having the courage to stand behind something you care about. Working on my project gave me confidence to speak up, share my views, and challenge things when I didn't think they were right. I can’t say I became a different person. I just became more confident being myself.",
  },
  {
    name: 'AP',
    role: 'Age 17 — Career Edge Programme',
    headline: 'I finally had something meaningful to talk about.',
    body: 'In my interviews, instead of talking only about school and grades, I had practical examples, challenges, and achievements to discuss. I felt I could demonstrate what I had actually done and achieved, not just what I had studied.',
  },
  {
    name: 'Parent',
    role: 'Parent of Year 9 Student — School Edge Programme',
    headline: 'This was completely different from a school enrichment programme.',
    body: 'Rather than simply teaching new skills, the programme helped our daughter understand how her thinking and habits were holding her back from what she really wanted for herself.',
  },
  {
    name: 'RH',
    role: 'Age 19 — Early Career Advantage Programme',
    headline: 'I walked into my very first professional interview feeling confident and prepared.',
    body: "The coaching and interview practice helped a lot. I was surprised that the interview actually didn’t feel intimidating. Even when I was asked a question I wasn't fully prepared for, I knew how to stay composed and handle the situation.",
  },
  {
    name: 'Parent',
    role: 'Parent of Age 13 Student — Early Leader Foundations Programme',
    headline: 'The confidence gains were remarkable.',
    body: 'Our son became more independent, organised, and focused. I think he now can see when he is doing something he loves, he can do anything.',
  },
  {
    name: 'Parent',
    role: 'Parent of Age 14 Student — Early Leader Foundations Programme',
    headline: 'The programme helped her believe in herself as a leader.',
    body: 'She became much more comfortable sharing her ideas and stepping forward, even when other people saw things differently. One of the biggest changes for her was seeing that you can be thoughtful, quiet, and still have a huge influence. That shift in her confidence was lovely to watch on the presentation day.',
  },
  {
    name: 'Parent',
    role: 'Parent of Age 12 Student — School Edge Programme',
    headline: 'It gave our son direction.',
    body: "He wasn't lost exactly, but he didn't really have a clear focus. The programme helped him think about where he wanted to go and what he needed to do to get there. Since then, he's been much more motivated and purposeful in how he approaches things. One of the biggest differences we noticed was during his school interview. He went in with far more confidence, communicated his ideas clearly, and seemed much more comfortable talking about himself and his aspirations. We came away feeling that the programme had prepared him for that experience in ways we hadn't expected.",
  },
  {
    name: 'KM',
    role: 'Age 18 — University Edge Programme 2025',
    headline: 'I felt like I had something more than most students my age.',
    body: "It wasn't about sounding impressive anymore. It was about having done something meaningful that I believed in and wanted to succeed at. I felt more confident because I knew I had something that set me apart.",
  },
  {
    name: 'Parent',
    role: 'Parent of Age 13 Student — Early Leader Foundations Programme',
    headline: 'XDGE helped our child grow up.',
    body: "It wasn't an overnight change, but we definitely saw him start taking more ownership of things, thinking ahead more, and following through on commitments over the course of the programme. I think the project helped him see that he could achieve much more than he realised when he focused his effort on something he believed in.",
  },
  {
    name: 'DS',
    role: 'Age 20 — Career Edge Programme',
    headline: 'I learned skills I wish I had developed years earlier.',
    body: "A lot of what I learned isn't taught in school or university. Things like how to communicate professionally, hold a meeting, take initiative, hold presence in a room or even deal with difficult people. They sound simple, but they make a huge difference. I honestly wish I had learned them years ago.",
  },
  {
    name: 'RJS',
    role: 'Age 23 — Career Edge Programme',
    headline: 'Having access to someone with that level of experience was amazing.',
    body: "My coach had done some really impressive things, but they never made it feel intimidating. They were easy to talk to and genuinely interested in helping me develop my ideas. What started as a rough concept turned into a project I was genuinely proud of. Looking back, they helped me think bigger, pay more attention to detail, and produce something far better than I would have done on my own. I don't think I would not have got this job role without it.",
  },
  {
    name: 'ML',
    role: 'Age 15 — School Edge Programme',
    headline: "The feedback helped me see strengths I didn't know I had.",
    body: "It helped me see strengths and qualities in myself that I hadn't really noticed before. I think I was probably too hung up on what I needed to improve. Looking back, that support changed quite a lot for me. It changed how I see myself, what I think I'm capable of, and even how I see my future.",
  },
  {
    name: 'TS',
    role: 'Age 14 — School Edge',
    headline: 'Working with professionals in the real world was both inspiring and a bit of a reality check.',
    body: "It made me realise the standards people are working to and how much opportunity there is if you're willing to put yourself out there. It was motivating to see what is possible.",
  },
  {
    name: 'CB',
    role: 'Age 19 — University Edge Programme',
    headline: 'I realised I had to stop waiting for opportunities and start creating them.',
    body: 'I used to spend a lot of time thinking about things I wanted to do without really taking the first step. The programme helped me turn my ideas into action and gave me the confidence to give things a go. My leadership portfolio boosted my personal statement a lot.',
  },
  {
    name: 'AF',
    role: 'Age 16 — School Edge Programme',
    headline: 'I became comfortable being uncomfortable.',
    body: "I won't say I enjoyed every challenge at the time, but looking back, those were the things that helped me grow the most. I learned that confidence doesn't come before you do something difficult, it comes afterwards. Now I'm much more willing to take on things that I would probably have avoided before.",
  },
  {
    name: 'Parent',
    role: 'Parent of 19-Year-Old Student — University Edge Programme',
    headline: 'The professional skills stood out immediately.',
    body: 'When she started university, she seemed a step ahead in a lot of ways. She was comfortable speaking to new people, managing her responsibilities, and taking opportunities when they came up. The confidence and professionalism she developed through the programme definitely helped her hit the ground running.',
  },
  {
    name: 'TW',
    role: 'Age 21 — Career Edge Programme',
    headline: 'Employers noticed.',
    body: 'Before XDGE, I felt like I had the same sort of things on my CV as lots of other graduates. The programme gave me experiences and projects that helped me stand out. Interviews stopped feeling like a test and started feeling more like a conversation because I had real examples to share. I think that confidence came across and helped me make a much stronger impression.',
  },
  {
    name: 'ZP',
    role: 'Age 16 — School Edge Programme',
    headline: 'I spent weeks worrying that everyone else would be better than me.',
    body: 'When my video played and I looked back at everything I had done over the programme, I felt proud of myself. Instead of worrying about what everyone else was doing, I was looking at how far I had come. I realised I had achieved a lot more than I had given myself credit for.',
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
                lineHeight: 0.95,
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
                <h2 style={{
                  fontFamily: theme.display, fontWeight: 700,
                  fontSize: 'clamp(33px, 3.9vw, 54px)',
                  lineHeight: 1.18, letterSpacing: '-0.005em',
                  margin: '0 0 24px',
                  color: theme.base,
                }}>
                  {t.headline}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.4vw, 16px)',
                  lineHeight: 1.65,
                  color: theme.base,
                  margin: 0,
                  maxWidth: 640,
                }}>
                  {t.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
