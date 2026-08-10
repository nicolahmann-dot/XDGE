import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { ParallaxImage } from '../primitives/ParallaxImage';

const items = [
  {
    title: 'Professional Leadership Portfolio',
    desc: 'A structured portfolio showcasing your projects, presentations, reflections, and leadership development throughout the programme.',
    img: '/assets/experience-card-1.webp',
  },
  {
    title: 'Skills Transcript',
    desc: 'A documented record of the leadership, thinking, and professional skills developed during the programme.',
    img: '/assets/blog-02.webp',
  },
  {
    title: 'Certificate of Achievement',
    desc: 'Certificate of Achievement recognising your successful completion and leadership development.',
    img: '/assets/principle-1.webp',
  },
  {
    title: 'Letter of Recommendation',
    desc: 'Written feedback and recommendations from programme leaders recognising your development, strengths, and leadership potential.',
    img: '/assets/who-we-are.webp',
  },
  {
    title: 'Video Recording of Final Presentation',
    desc: 'A recorded presentation of your final pitch to a panel of leaders, demonstrating your thinking, communication, and leadership capability.',
    img: '/assets/blog-01.webp',
  },
  {
    title: '90-Day Action Plan',
    desc: 'A clear development plan outlining the next steps to strengthen your leadership skills and continue your progress beyond the programme.',
    img: '/assets/principle-5.webp',
  },
  {
    title: 'Interview-Ready With Clarity And Confidence',
    desc: 'Ready to perform in interviews with clarity and confidence. Clear thinking, strong self-belief, defined direction, and preparation for high-stakes presentations.',
    img: '/assets/about-banner.webp',
  },
  {
    title: 'Confidence, Self-Belief & Performance Focus',
    desc: 'Stronger self-confidence, clearer self-belief, and the focus to perform under pressure. Develop the mindset, resilience, and self-efficacy needed to step forward, communicate with conviction, and perform when it matters most.',
    img: '/assets/blog-03.webp',
  },
];

const fadeEase = [0.22, 1, 0.36, 1];

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: fadeEase } },
};

export function WhatYouLeaveWithList() {
  return (
    <section
      data-screen-label="What You Leave With"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="xg-leave-with-header" style={{ marginBottom: 'clamp(48px, 7vw, 88px)' }}>
        <SplitHeading
          lines={[
            <span className="xdge-leave-with-solid">WHAT YOU</span>,
            <span className="xdge-leave-with-hollow">LEAVE WITH</span>,
          ]}
          lineClipClasses={['xdge-leave-with-clip', 'xdge-leave-with-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        />
        </div>

        <div className="xg-leave-list">
          {items.map((it) => (
            <motion.div data-no-reveal
              key={it.title}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="xg-leave-row"
            >
              <div className="xg-leave-img">
                <ParallaxImage
                  src={it.img}
                  alt=""
                  objectPosition="50% 40%"
                  style={{ width: '100%', aspectRatio: '1 / 1', background: '#000000' }}
                />
              </div>

              <div className="xg-leave-text">
                <h3 style={{
                  fontFamily: theme.body, fontWeight: 700,
                  fontSize: 'clamp(33px, 3.9vw, 48px)',
                  lineHeight: 1.15, letterSpacing: '-0.005em',
                  margin: '0 0 14px',
                  color: theme.base,
                }}>{it.title}</h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  lineHeight: 1.6, margin: 0,
                  color: theme.subtitle,
                  maxWidth: 640,
                }}>{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
