import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import { site } from '../../config/site';
import { SocialLinks } from '../SocialLinks';

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'How It Works', to: '/how-it-works' },
];

const resourceLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
  { label: 'Apply', to: '/apply' },
];

const phoneIcon = (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function Footer() {
  const { uk, usa } = site.phones;

  return (
    <footer
      data-screen-label="09 Footer"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base, paddingTop: 0,
        overflow: 'hidden', borderTop: `1px solid ${theme.borderDark}`,
      }}
    >
      <div style={{
        overflow: 'hidden',
        padding: 'clamp(40px, 6vw, 64px) 0 clamp(24px, 4vw, 40px)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}>
        <div
          className="xdge-footer-marquee xdge-footer-marquee-text"
        >
          <span style={{ paddingRight: '0.35em' }}>CAREER · UNIVERSITY · SCHOOL ·</span>
          <span style={{ paddingRight: '0.35em' }}>CAREER · UNIVERSITY · SCHOOL ·</span>
        </div>
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 40px)',
      }}>
        <div className="xg-2" style={{
          gap: 'clamp(32px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 8vw, 88px)',
        }}>
          <div>
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 14,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Head Office</div>
            <div style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.6, color: theme.base, marginBottom: 24 }}>
              {site.address.line1},<br />
              {site.address.line2},<br />
              {site.address.city}. {site.address.postcode}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: `1px solid ${theme.borderDark}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme.base, flexShrink: 0,
              }}>{phoneIcon}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: theme.base }}>
                <div>
                  {uk.label}:{' '}
                  <a href={`tel:${uk.tel}`} style={{ color: theme.base, textDecoration: 'none' }} data-cursor="grow">
                    {uk.display}
                  </a>
                </div>
                <div>
                  {usa.label}:{' '}
                  <a href={`tel:${usa.tel}`} style={{ color: theme.base, textDecoration: 'none' }} data-cursor="grow">
                    {usa.display}
                  </a>
                </div>
                <div style={{ marginTop: 8 }}>
                  <a href={`mailto:${site.email}`} style={{ color: theme.subtitle, textDecoration: 'none' }} data-cursor="grow">
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="xg-footer-right">
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 14,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Follow Us</div>
            <SocialLinks theme="dark" />
          </div>
        </div>

        <div className="xg-2" style={{
          gap: 'clamp(32px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 64px)',
          alignItems: 'flex-start',
        }}>
          <div className="xg-2" style={{ gap: 'clamp(32px, 5vw, 64px)' }}>
            <div>
              <div style={{
                fontSize: 11, color: theme.subtitle, marginBottom: 16,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>Company</div>
              {companyLinks.map((l) => (
                <div key={l.label} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  <Link to={l.to} style={{ color: theme.base, textDecoration: 'none' }} data-cursor="grow">{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 11, color: theme.subtitle, marginBottom: 16,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>Resources</div>
              {resourceLinks.map((l) => (
                <div key={l.label} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  <Link to={l.to} style={{ color: theme.base, textDecoration: 'none' }} data-cursor="grow">{l.label}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="xg-footer-right" style={{ maxWidth: 380 }}>
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 16,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Insights</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: theme.base, marginBottom: 18 }}>
              Stay ahead with leadership insights<br />
              that drive performance.
            </div>
            <Link
              to="/insights"
              data-cursor="grow"
              className="xg-footer-insights-link"
            >
              Read all insights →
            </Link>
          </div>
        </div>

        <div style={{ height: 1, background: theme.borderDark }} />

        <div style={{
          padding: 'clamp(20px, 3vw, 28px) 0 clamp(20px, 3vw, 28px)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: theme.subtitle,
          gap: 12, flexWrap: 'wrap',
        }}>
          <div>©2026 XDGE — All rights reserved</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ color: theme.subtitle, textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: theme.subtitle, textDecoration: 'none' }}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
