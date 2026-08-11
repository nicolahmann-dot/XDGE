import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';

const ic = {
  width: 30, height: 30, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
};

const Icons = {
  experts: (
    <svg {...ic}><circle cx="12" cy="7" r="2.6" /><circle cx="5.5" cy="9" r="2" /><circle cx="18.5" cy="9" r="2" /><path d="M7.4 15c.4-1.9 2-3.5 4.6-3.5s4.2 1.6 4.6 3.5" /><path d="M2.3 15.4C2.7 14 3.9 13 5.5 13M21.7 15.4c-.4-1.4-1.6-2.4-3.2-2.4" /></svg>
  ),
  coach: (
    <svg {...ic}><circle cx="12" cy="8" r="3" /><path d="M6 20a6 6 0 0 1 12 0" /><path d="M5 10a7 7 0 0 1 14 0" /><path d="M5 10v1.5M19 10v1.5" /></svg>
  ),
  workshop: (
    <svg {...ic}><circle cx="12" cy="12" r="3.2" /><path d="M19.4 12c0-.4 0-.8-.1-1.2l2-1.5-2-3.4-2.3 1a7.3 7.3 0 0 0-2-1.2l-.3-2.5H9.3L9 5.7a7.3 7.3 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5a7.4 7.4 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.3 7.3 0 0 0 2 1.2l.3 2.5h4.4l.3-2.5a7.3 7.3 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z" /></svg>
  ),
  roundtable: (
    <svg {...ic}><circle cx="12" cy="12" r="5.5" /><circle cx="12" cy="4.4" r="1.4" /><circle cx="12" cy="19.6" r="1.4" /><circle cx="4.4" cy="12" r="1.4" /><circle cx="19.6" cy="12" r="1.4" /></svg>
  ),
  project: (
    <svg {...ic}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z" /></svg>
  ),
  portfolio: (
    <svg {...ic}><rect x="3" y="4" width="18" height="11" rx="2" /><path d="M12 15v3" /><path d="M8 21a4 4 0 0 1 8 0" /></svg>
  ),
  presentation: (
    <svg {...ic}><rect x="2" y="7" width="20" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M2 13h20" /></svg>
  ),
  support: (
    <svg {...ic}><path d="M3 13a2 2 0 0 1 2-2h1.8l2.4 1.8H14a1.5 1.5 0 0 1 0 3H9.3" /><path d="M14.6 4.3a2.2 2.2 0 0 0-2.6 0 2.2 2.2 0 0 0-2.6 0 2.4 2.4 0 0 0 0 3.5L12 10.3l2.6-2.5a2.4 2.4 0 0 0 0-3.5z" /></svg>
  ),
};

const items = [
  { icon: Icons.experts, title: 'Expert Development & Feedback', desc: 'Receive training, coaching, reviews, and guidance from senior industry experts.' },
  { icon: Icons.coach, title: 'Dedicated Leadership Coach', desc: 'Your own coach who supports, challenges, and guides your development throughout the programme.' },
  { icon: Icons.workshop, title: 'Leadership Workshops', desc: 'Develop leadership, professional, and workplace skills through practical learning.' },
  { icon: Icons.roundtable, title: 'Executive Round Tables', desc: 'Attend small group professional sessions working directly with experienced business leaders and professionals.' },
  { icon: Icons.project, title: 'Leadership Project', desc: 'Put your newly acquired skills into practice and develop a meaningful project connected to your interests, ambitions, or future goals.' },
  { icon: Icons.portfolio, title: 'Leadership Portfolio', desc: 'Showcase your achievements, project work, and development in a professional portfolio.' },
  { icon: Icons.presentation, title: 'Presentation Opportunities', desc: 'Build confidence, communication, and presentation skills through real-world presentations, feedback, and interview practice.' },
  { icon: Icons.support, title: 'Challenge & Support', desc: 'A culture of accountability, encouragement, high levels of support, high standards, high expectations.' },
];

export function WhatYouWillExperience() {
  return (
    <section
      data-screen-label="What You Will Experience"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(120px, 15vw, 200px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="xg-exp-heading-block">
        <SplitHeading
          lines={[
            <span className="xdge-the-exp-line">
              <span className="xdge-the-exp-solid">THE</span>{' '}
              <span className="xdge-the-exp-hollow">EXPERIENCE</span>
            </span>,
          ]}
          lineClipClasses={['xdge-the-exp-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 1,
            textAlign: 'left',
            textTransform: 'uppercase',
          }}
        />
        </div>

        {/* icon + title + description list */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(24px, 3vw, 40px)',
          marginTop: 'clamp(48px, 7vw, 96px)',
          maxWidth: 1000,
        }}>
          {items.map((it) => (
            <div
              key={it.title}
              data-reveal
              style={{ display: 'flex', gap: 'clamp(18px, 2.4vw, 34px)', alignItems: 'flex-start' }}
            >
              <span style={{
                flexShrink: 0, color: theme.base, marginTop: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {it.icon}
              </span>
              <div>
                <h4 style={{
                  margin: 0, fontFamily: theme.subheading, fontWeight: 700,
                  fontSize: 'clamp(17px, 1.8vw, 21px)', letterSpacing: '-0.005em',
                  color: theme.base,
                }}>{it.title}</h4>
                <p style={{
                  margin: '6px 0 0', fontFamily: theme.body,
                  fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.5,
                  color: theme.subtitle,
                }}>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The People Behind Your Progress — bottom right */}
        <div data-reveal className="xg-people-block xg-exp-heading-block" style={{
          maxWidth: 560,
          marginTop: 'clamp(40px, 6vw, 80px)',
        }}>
          <SplitHeading
            tag="h3"
            lines={[
              <span className="xdge-people-hollow xdge-people-line-narrow">THE PEOPLE BEHIND</span>,
              <span className="xdge-people-solid">YOUR PROGRESS</span>,
            ]}
            lineClipClasses={[
              'xdge-clip-tight-y xdge-people-clip',
              'xdge-clip-tight-y xdge-people-clip xdge-people-clip-solid',
            ]}
            style={{
              fontFamily: theme.displayCondensed,
              fontSize: 'clamp(32px, 6.2vw, 88px)',
              lineHeight: 0.75,
              textAlign: 'left',
              textTransform: 'uppercase',
            }}
          />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: 'clamp(16px, 2vw, 24px) 0' }} />
          <p style={{
            margin: 0, fontFamily: theme.body,
            fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6,
            color: theme.subtitle,
          }}>
            Throughout the programme, you work alongside experienced coaches,
            professionals, entrepreneurs, and business leaders who help you
            develop the confidence, capability, and leadership skills needed to
            achieve your next-level goal.
          </p>
        </div>
      </div>
    </section>
  );
}
