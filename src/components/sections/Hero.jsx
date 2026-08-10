import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';
import { Group, Reveal } from '../primitives/Reveal';

const XDGE_LOGO = '/assets/New Logo/Artboard 3.png';

export function Hero() {
  return (
    <section
      data-screen-label="01 Hero"
      data-cursor="light"
      data-section-theme="dark"
      className="xg-home-hero"
      style={{
        background: '#000000',
        color: theme.base,
        minHeight: '135vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <HeroAmbient
        src="/assets/videos/logo_reveal.mp4"
        poster="/assets/videos/logo_reveal_poster.jpg"
        overlayOpacity={0.18}
      />

      <div className="xg-hero-lockup xg-hero-brand-lockup">
        <p className="xg-hero-brand-kicker">THE</p>
        <img
          src={XDGE_LOGO}
          alt="XDGE"
          className="xg-hero-brand-logo"
          fetchPriority="high"
          decoding="async"
        />
        <p className="xg-hero-brand-tagline">LEAD YOUR OWN OPPORTUNITIES.</p>
        <p className="xg-hero-brand-keywords">TRAIN • BUILD • LEAD • IMPACT</p>
      </div>

      <Group className="xg-hero-copy" style={{
        position: 'absolute',
        bottom: 'clamp(12px, 2vw, 20px)',
        right: 'clamp(24px, 4vw, 40px)',
        zIndex: 10,
        textAlign: 'right',
        maxWidth: 580,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}>
        <Reveal style={{ width: '100%' }}>
          <h3 style={{
            fontSize: 'clamp(20px, 2.2vw, 28px)',
            lineHeight: 1.25,
            margin: 0,
            fontFamily: theme.body,
            color: theme.base,
            fontWeight: 600,
          }}>
            For Young People 12&ndash;24 Building<br />
            Their Next Step Advantage
          </h3>
        </Reveal>

        <Reveal style={{ width: '100%' }}>
          <div style={{ width: '100%', height: 1, background: '#ffffff', margin: '16px 0 20px' }} />
        </Reveal>

        <Reveal style={{ width: '100%' }}>
          <p style={{
            fontSize: 'clamp(12px, 1.3vw, 14px)',
            lineHeight: 1.5,
            margin: '0 0 20px',
            color: '#e0e0e0',
            fontWeight: 400,
          }}>
            The XDGE (pronounced Edge) helps ambitious young people develop the
            leadership, skills, and real-world experience that define their distinctive edge.
            Guided by experienced leaders and industry experts, participants build the
            confidence, capability, and portfolio to stand out in their next opportunity and
            make an impact in school, university, careers, business, and life.
          </p>
        </Reveal>

        <Reveal>
          <Link
            to="/programmes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 999,
              color: theme.base,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 500,
              background: 'rgba(0,0,0,0.55)',
            }}
          >
            View All Programmes <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </Reveal>
      </Group>
    </section>
  );
}
