import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import { Group } from '../primitives/Reveal';

function PlayIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
      <path d="M0 0v12l10-6z" />
    </svg>
  );
}

export function ProgrammeCTA() {
  return (
    <section
      data-screen-label="Programme CTA"
      data-section-theme="dark"
      className="xg-programme-cta"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(48px, 6vw, 72px) clamp(20px, 4vw, 40px)',
        borderTop: `1px solid ${theme.borderDark}`,
      }}
    >
      <div className="xg-programme-cta-panel">
        <Group className="xg-programme-cta-grid">
          <div className="xg-programme-cta-copy">
            <p data-reveal style={{
              margin: '0 0 8px',
              fontFamily: theme.body,
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}>
              Not sure which pathway fits?
            </p>
            <p data-reveal style={{
              margin: 0,
              fontFamily: theme.body,
              fontSize: 15,
              lineHeight: 1.55,
              color: theme.subtitle,
              maxWidth: '36em',
            }}>
              Tell us about your goals — we will recommend the right programme and format.
            </p>
          </div>
          <div className="xg-programme-cta-actions" data-reveal>
            <Link to="/apply" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
              Apply Now <PlayIcon />
            </Link>
            <Link to="/contact" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-outline">
              Book a Call <PlayIcon />
            </Link>
          </div>
        </Group>
      </div>
    </section>
  );
}
