import { Link, useParams } from 'react-router-dom';
import { theme } from '../theme';
import { usePageMeta } from '../hooks/usePageMeta';
import { findProgramme } from '../data/menu';

export default function ProgrammeDetail() {
  const { slug } = useParams();
  const programme = findProgramme(slug);

  usePageMeta(programme ? {
    title: `${programme.label} — XDGE`,
    description: programme.description,
  } : {
    title: 'Page Not Found — XDGE',
    description: 'The page you are looking for could not be found.',
  });

  if (!programme) {
    return (
      <section
        data-screen-label="404 Not Found"
        data-section-theme="dark"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.dark,
          color: theme.base,
          padding: 'clamp(120px, 16vw, 160px) clamp(20px, 4vw, 40px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h1 style={{
            margin: '0 0 20px',
            fontFamily: theme.displayCondensed,
            fontSize: 'clamp(48px, 12vw, 96px)',
            lineHeight: 0.86,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}>
            Page Not Found
          </h1>
          <Link to="/programmes" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
            All programmes
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      data-screen-label="Programme Hero"
      data-section-theme="dark"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(140px, 16vw, 180px) clamp(20px, 4vw, 40px) clamp(80px, 10vw, 120px)',
      }}
    >
      <div style={{ maxWidth: 880 }}>
        <p style={{
          margin: '0 0 16px',
          fontFamily: theme.body,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: theme.subtitle,
          fontWeight: 600,
        }}>
          {programme.groupTitle}
        </p>
        <h1 style={{
          margin: '0 0 20px',
          fontFamily: theme.displayCondensed,
          fontWeight: 400,
          fontSize: 'clamp(48px, 9vw, 104px)',
          lineHeight: 0.86,
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
        }}>
          {programme.label}
        </h1>
        <p style={{
          margin: '0 0 12px',
          fontFamily: theme.body,
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: theme.subtitle,
          fontWeight: 600,
        }}>
          {programme.groupSubtitle}
        </p>
        <p style={{
          margin: '0 0 36px',
          fontFamily: theme.body,
          fontSize: 'clamp(16px, 1.6vw, 18px)',
          lineHeight: 1.6,
          color: theme.subtitle,
          maxWidth: '36em',
        }}>
          {programme.description}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/programmes" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
            All programmes
          </Link>
          <Link to="/apply" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-outline">
            Apply
          </Link>
        </div>
      </div>
    </section>
  );
}
