import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({
    title: 'Page Not Found — XDGE',
    description: 'The page you are looking for could not be found.',
  });

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
        <p style={{
          margin: '0 0 16px',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: theme.subtitle,
          fontWeight: 600,
        }}>
          404
        </p>
        <h1 style={{
          margin: '0 0 20px',
          fontFamily: theme.displayCondensed,
          fontSize: 'clamp(48px, 12vw, 96px)',
          lineHeight: 0.75,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}>
          Page Not Found
        </h1>
        <p style={{
          margin: '0 0 32px',
          fontFamily: theme.body,
          fontSize: 'clamp(16px, 1.6vw, 18px)',
          lineHeight: 1.6,
          color: theme.subtitle,
        }}>
          The page you are looking for may have moved or no longer exists.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
