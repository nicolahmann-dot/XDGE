import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';

const sIcon = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const mIcon = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

const features = [
  {
    title: 'Industry Specialist Mentor',
    desc: 'Learn from a highly vetted expert in your chosen field.',
    icon: (<svg {...sIcon}><circle cx="9" cy="8" r="3.6" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M18.4 11.4l1 2 2.2.4-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.4z" /></svg>),
  },
  {
    title: 'Portfolio Development',
    desc: 'Build evidence of your capability, initiative, and impact.',
    icon: (<svg {...sIcon}><path d="M3 7a2 2 0 0 1 2-2h3.5l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 11h18" /></svg>),
  },
  {
    title: 'Future Readiness',
    desc: 'Strengthen applications, interviews, and competitive opportunities.',
    icon: (<svg {...sIcon}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>),
  },
];

const incubators = [
  { name: 'Business Incubator', desc: 'Develop and launch ventures with expert mentorship.' },
  { name: 'Research Incubator', desc: 'Build academic and applied research capabilities that create impact.' },
  { name: 'Tech & Bio Incubator', desc: 'Innovate in emerging technologies and life sciences.' },
  { name: 'Leadership Incubator', desc: 'Tackle real leadership challenges and deliver measurable impact.' },
];

const Clock = (<svg {...mIcon}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5l3.2 2" /></svg>);
const Cal = (<svg {...mIcon}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 3v4M16 3v4" /></svg>);
const Check = (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);

export function IncubatorPathways() {
  return (
    <section
      data-screen-label="Incubator Pathways"
      data-section-theme="accent"
      style={{
        background: "url('/assets/reviews-bg.jpg') center/cover no-repeat",
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 56px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="xg-2" style={{ alignItems: 'start', gap: 'clamp(40px, 5vw, 88px)' }}>

          {/* LEFT — eyebrow, heading, meta, body */}
          <div>
            <div style={{ fontFamily: theme.body, fontSize: 'clamp(15px, 1.5vw, 19px)', fontWeight: 700, letterSpacing: '0.01em' }}>
              Ideal For Career &amp; University Applications
            </div>
            <div style={{ width: 96, height: 2, background: 'rgba(255,255,255,0.55)', margin: 'clamp(14px,1.6vw,20px) 0 clamp(24px,3vw,36px)' }} />

            <div className="xg-exp-heading-block">
              <SplitHeading
                tag="h2"
                lines={['Entrepreneur & Incubator Pathways']}
                style={{
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 'clamp(44px, 7.8vw, 118px)',
                  lineHeight: 1.0, letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              />
            </div>

            <div style={{ width: 96, height: 2, background: 'rgba(255,255,255,0.55)', margin: 'clamp(28px,3.4vw,44px) 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(12px, 2vw, 28px)', fontFamily: theme.body, fontSize: 'clamp(16px,1.7vw,22px)', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{Clock} 4–6 hrs/week</span>
              <span style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.35)' }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{Cal} 13–18 weeks</span>
            </div>

            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              lineHeight: 1.5, color: 'rgba(255,255,255,0.82)',
              margin: 'clamp(28px,3.4vw,44px) 0 0', maxWidth: 460,
            }}>
              Real-world programmes where students turn ideas into tangible results and apply skills with purpose.
            </p>
          </div>

          {/* RIGHT — feature cards + incubator checklist */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                display: 'flex', alignItems: 'center', gap: 'clamp(16px,1.8vw,26px)',
                padding: 'clamp(16px,1.8vw,22px) 0',
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
              }}>
                <div style={{
                  width: 'clamp(60px,6.5vw,84px)', height: 'clamp(60px,6.5vw,84px)',
                  borderRadius: 'clamp(14px,1.6vw,20px)', flexShrink: 0,
                  background: 'rgba(6, 18, 52, 0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: '62%', height: '62%', borderRadius: '50%',
                    background: 'linear-gradient(150deg, #5b9bff 0%, #1d49b8 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  }}>{f.icon}</div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.18)' }} />
                <div>
                  <h4 style={{ margin: 0, fontFamily: theme.displayTight, fontWeight: 700, fontSize: 'clamp(18px,1.9vw,24px)', lineHeight: 1.2, color: '#fff' }}>{f.title}</h4>
                  <p style={{ margin: '6px 0 0', fontFamily: theme.body, fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.45, color: 'rgba(255,255,255,0.78)' }}>{f.desc}</p>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 'clamp(16px,2vw,28px)' }}>
              {incubators.map((it) => (
                <div key={it.name} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 'clamp(12px,1.4vw,18px)',
                  padding: 'clamp(14px,1.7vw,20px) 0',
                  borderTop: '1px solid rgba(255,255,255,0.14)',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: '#2f6df0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  }}>{Check}</span>
                  <p style={{ margin: 0, fontFamily: theme.body, fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.45 }}>
                    <strong style={{ fontWeight: 700, color: '#fff' }}>{it.name}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}> — {it.desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
