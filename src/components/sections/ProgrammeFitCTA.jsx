import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const fadeEase = [0.2, 0.7, 0.2, 1];

export function ProgrammeFitCTA() {
  return (
    <section
      data-screen-label="Right Programme Fit"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['DISCOVER HOW', 'WE ENSURE THE', 'RIGHT PROGRAMME', 'FIT.']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            // Capped below the usual 200px: this line is nowrap inside a container that
            // stops at maxWidth 1280 while 11.3vw keeps growing, so past a ~1770px
            // viewport it overflowed and the clip shaved the end off — "RIGHT PROGRAMME"
            // measured 1427px against 1280px, i.e. 1280/(1427/200) = 179px is the limit.
            fontSize: 'clamp(40px, 11.3vw, 175px)',
            lineHeight: 0.75, letterSpacing: '-0.02em',
            marginBottom: 'clamp(48px, 7vw, 88px)',
          }}
        />

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(40px, 8vw, 120px)' }}>
          <div
            data-reveal="scale"
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 18,
            }}
          >
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{
                width: 'clamp(120px, 14vw, 180px)',
                aspectRatio: '1 / 1',
                overflow: 'hidden', background: '#000000',
              }}>
                <img
                  src="/assets/blog-02.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 30%',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{
                width: 'clamp(120px, 14vw, 180px)',
                aspectRatio: '1 / 1',
                overflow: 'hidden', background: '#000000',
              }}>
                <img
                  src="/assets/blog-01.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 30%',
                    display: 'block',
                  }}
                />
              </div>
            </div>
            <div style={{
              fontSize: 14, lineHeight: 1.5,
              color: theme.subtitle,
              maxWidth: 360,
            }}>
              Available 9AM &ndash; 6PM (GMT) Mon&ndash;Fri
            </div>
          </div>

          <div
            data-reveal
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(20px, 3vw, 32px)',
              paddingTop: 'clamp(8px, 2vw, 16px)',
            }}
          >
            <p style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.45,
              color: theme.base, margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              maxWidth: 560,
            }}>
              Whether for one aspiring leader, a university, or a school,
              discover how we match the right development pathway to personal
              style, goals, aspirations, and future direction.
            </p>

            <Link
              to="/contact"
              data-cursor="grow"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '18px 32px',
                background: theme.ink, color: theme.base,
                textDecoration: 'none',
                fontSize: 15, fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Schedule A Call <span style={{ fontSize: 18 }}>→</span>
            </Link>
          </div>
        </Group>
      </div>
    </section>
  );
}
