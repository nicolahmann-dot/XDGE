import { motion } from 'framer-motion';
import { theme, fadeUp, cardRise, cardStagger } from '../../theme';
import { Group } from '../primitives/Reveal';
import { ParallaxImage } from '../primitives/ParallaxImage';
import { SplitHeading } from '../primitives/SplitHeading';

const tiers = [
  {
    name: 'PROFESSIONAL XDGE',
    tagline: 'Presence From Day One',
    desc: 'For final-year students, graduates, and early career professionals looking to develop the professional skills, leadership capability, and workplace confidence needed to earn trust, build influence, and make an impact from day one.',
    cards: [
      {
        duration: 'Weeks 1-4',
        title: 'High Performance Leadership Mindset',
        desc: 'Build the mindset, confidence, resilience, and professional presence that distinguish high performers and future leaders.',
        img: '/assets/ALL NEW IMAGES/16.webp',
      },
      {
        duration: 'Weeks 5-8',
        title: 'Leadership Influence & Impact Skills',
        desc: 'Develop executive presence, workplace influence, and the practical leadership and people skills needed to build credibility, navigate challenges, and create results from day one.',
        img: '/assets/ALL NEW IMAGES/17.webp',
      },
      {
        duration: 'Weeks 9-12',
        title: 'Career Accelerator Project',
        desc: 'Lead a signature leadership project that showcases your expertise, demonstrates real-world impact, and helps establish your reputation as an emerging leader in your chosen profession.',
        img: '/assets/ALL NEW IMAGES/18.webp',
      },
    ],
  },
  {
    name: 'UNIVERSITY XDGE',
    tagline: 'Stand Out Before You Apply',
    desc: 'For Ages 16+ build the leadership, initiative, and real-world experience that universities and competitive programmes actively seek.',
    cards: [
      {
        duration: 'Weeks 1-4',
        title: 'Leader Mindset',
        desc: 'Develop the mindset, confidence, and leadership qualities that help ambitious people pursue bigger goals and set themselves apart.',
        img: '/assets/ALL NEW IMAGES/1.webp',
      },
      {
        duration: 'Weeks 5-8',
        title: 'Professional & Leadership Toolkit',
        desc: 'Develop the professional skills, executive presence, and leadership capability that help you stand out in applications, interviews, and future opportunities.',
        img: '/assets/ALL NEW IMAGES/2.webp',
      },
      {
        duration: 'Weeks 9-12',
        title: 'Leadership Impact Project',
        desc: 'Design and deliver a project that demonstrates your leadership, interests, and potential while creating compelling evidence of what makes you different.',
        img: '/assets/ALL NEW IMAGES/3.webp',
      },
    ],
  },
  {
    name: 'SCHOOL XDGE',
    tagline: 'Lead From The Start',
    desc: 'For school students aged 11–18 looking to build leadership, initiative, and real-world experience that supports future applications and opportunities.',
    cards: [
      {
        duration: 'Weeks 1-4',
        title: 'Lead Yourself',
        desc: 'Build the confidence, resilience, self-awareness, and mindset mastery that help young people take ownership, lead with confidence, and realise their potential.',
        img: '/assets/ALL NEW IMAGES/6.webp',
      },
      {
        duration: 'Weeks 5-8',
        title: 'Leadership Toolkit',
        desc: 'Develop communication, teamwork, problem-solving, presentation, and leadership skills adapted from the professional world to help young people stand out with confidence.',
        img: '/assets/ALL NEW IMAGES/7.webp',
      },
      {
        duration: 'Weeks 9-12',
        title: 'Leadership Changemaker Project',
        desc: 'Create and lead a meaningful project that demonstrates leadership, initiative, and real-world impact while showcasing your unique strengths and ability to make a difference.',
        img: '/assets/ALL NEW IMAGES/15.webp',
      },
    ],
  },
  {
    name: 'SPECIALISED XDGE',
    tagline: 'Turn Ambition Into Action',
    desc: '1:1 Expert project mentorship for ambitious individuals aged 11+ looking to pursue a specific interest, idea, venture, or future pathway while building the skills, experience, and readiness needed for their next-level opportunity.',
    cards: [
      {
        duration: '12-14 weeks · 1:2:1 Mentor Programme',
        title: 'Incubator Pathways',
        desc: 'Take your idea from concept to reality through a specialist mentored incubator pathway focused on business, research, technology, life sciences, social enterprise, or leadership.',
        img: '/assets/ALL NEW IMAGES/Untitled design (58).jpg',
      },
      {
        duration: '12-14 weeks · 1:2:1 Mentor Programme',
        title: 'Junior MBA',
        desc: 'Build a strong foundation in business and leadership through an accelerated programme designed for future entrepreneurs and leaders.',
        img: '/assets/leader-found-2.webp',
      },
      {
        duration: '12-14 weeks · 1:2:1 Mentor Programme',
        title: 'Business English & Workplace Fluency',
        desc: 'Master the language of business through practical training in meetings, presentations, networking, professional writing, and workplace communication.',
        img: '/assets/ALL NEW IMAGES/20.webp',
      },
    ],
  },
];

const tierHeadingProps = {
  lineClasses: ['xdge-condensed-hollow xdge-tier-hollow'],
  lineClipClasses: ['xdge-condensed-clip-narrow'],
  lineInnerClasses: ['xdge-tier-text-narrow'],
  style: {
    fontFamily: theme.displayCondensed,
    fontSize: 'clamp(64px, 12vw, 168px)',
    lineHeight: 0.72,
  },
};

function ProgrammeCard({ card }) {
  return (
    // Same reveal as the Insights cards on Home: a framer cardRise inside a
    // cardStagger Group, so cards lift in one by one instead of all fading
    // together under the generic CSS reveal.
    <motion.article
      data-no-reveal
      variants={cardRise}
      className="xg-tier-card"
      data-cursor="grow"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: theme.dark,
        border: `1px solid ${theme.borderLight}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <ParallaxImage
        className="xg-tier-card-media"
        src={card.img}
        objectPosition="50% 35%"
        style={{ width: '100%', aspectRatio: '1 / 1', background: '#000000' }}
      />

      <div style={{
        padding: 'clamp(22px, 2.6vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(12px, 1.4vw, 18px)',
        flex: 1,
      }}>
        <div style={{
          fontFamily: theme.body,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: theme.base,
        }}>
          {card.duration}
        </div>

        <h4 style={{
          fontFamily: theme.displayTight,
          fontSize: 'clamp(20px, 2.1vw, 26px)',
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          margin: 0,
          color: theme.base,
        }}>
          {card.title}
        </h4>

        <p style={{
          fontFamily: theme.body,
          fontSize: 'clamp(13px, 1.35vw, 15px)',
          lineHeight: 1.55,
          margin: 0,
          color: theme.subtitle,
        }}>
          {card.desc}
        </p>
      </div>
    </motion.article>
  );
}

function TierSeparator() {
  return (
    <div
      aria-hidden="true"
      style={{
        margin: 'clamp(56px, 7vw, 96px) 0',
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
      }}
    />
  );
}

export function ProgrammeTiers() {
  return (
    <section
      data-screen-label="Programme Tiers"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(56px, 7vw, 96px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {tiers.map((tier, i) => (
          <div key={tier.name}>
            {/* tier heading — hollow name + tagline + description (About-page style) */}
            <div style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>
              <div className="xdge-tier-heading-block xg-exp-heading-block xg-programmes-tier-heading">
                <SplitHeading
                  tag="h2"
                  lines={[tier.name]}
                  {...tierHeadingProps}
                />
                <p className="xdge-condensed-tagline xdge-programmes-tagline">
                  {tier.tagline}
                </p>
              </div>
              <p style={{
                fontFamily: theme.body,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                lineHeight: 1.5, color: theme.subtitle,
                margin: 0, maxWidth: '70ch',
              }}>
                {tier.desc}
              </p>
            </div>

            <Group
              className="xg-3"
              variants={cardStagger}
              style={{
                gap: 'clamp(20px, 2.4vw, 28px)',
                alignItems: 'stretch',
              }}
            >
              {tier.cards.map((card) => (
                <ProgrammeCard key={card.title} card={card} />
              ))}
            </Group>

            {i < tiers.length - 1 && <TierSeparator />}
          </div>
        ))}
      </div>
    </section>
  );
}
