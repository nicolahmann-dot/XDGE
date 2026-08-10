import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const CALENDLY_URL = 'https://calendly.com/thexdge/strategy-session';
const EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1`;

export function DiscoveryMeeting() {
  return (
    <section
      data-screen-label="Discovery Meeting"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(32px, 5vw, 56px)',
          alignItems: 'flex-start',
        }}>
          <SplitHeading
            tag="h2"
            lines={['SCHEDULE A', 'DISCOVERY MEETING']}
            lineClipClasses={['xdge-about-us-clip', 'xdge-condensed-clip-narrow']}
            lineInnerClasses={[undefined, 'xdge-condensed-text-narrow']}
            style={{
              fontFamily: theme.displayCondensed,
              fontSize: 'clamp(44px, 10vw, 170px)',
              lineHeight: 0.86,
              margin: 0,
              color: theme.ink,
              textTransform: 'uppercase',
            }}
          />

          <div
            data-reveal
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(14px, 1.8vw, 20px)',
              maxWidth: 720,
            }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 500,
              lineHeight: 1.45,
              margin: 0,
              color: theme.ink,
            }}>
              Prefer to speak with us directly?
            </p>
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(15px, 1.55vw, 17px)',
              lineHeight: 1.6,
              margin: 0,
              color: '#555555',
            }}>
              Book a complimentary discovery conversation with Nicola Mann to
              discuss your goals, explore suitable pathways, and determine
              whether XDGE is the right fit.
            </p>
          </div>

          {/* Calendly inline embed */}
          <div
            data-reveal
            style={{
              width: '100%',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#f2f2f2',
              border: `1px solid ${theme.borderLight}`,
            }}
          >
            <iframe
              title="Schedule a discovery meeting with Nicola Mann"
              src={EMBED_URL}
              loading="eager"
              style={{
                width: '100%',
                height: 'clamp(720px, 95vh, 1000px)',
                border: 0,
                display: 'block',
              }}
            />
          </div>

          <a
            data-reveal
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '14px 24px',
              border: `1px solid ${theme.ink}`, borderRadius: 999,
              color: theme.ink, textDecoration: 'none',
              fontFamily: theme.body, fontSize: 13, fontWeight: 600,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: 'background 0.3s var(--xg-ease), color 0.3s var(--xg-ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.ink;
              e.currentTarget.style.color = theme.base;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = theme.ink;
            }}
          >
            Open Scheduler in New Tab
            <span style={{ fontSize: 16, lineHeight: 1 }}>&rarr;</span>
          </a>

          <div
            data-reveal
            style={{
              marginTop: 'clamp(16px, 2.4vw, 32px)',
              paddingTop: 'clamp(24px, 3.2vw, 40px)',
              borderTop: `1px solid ${theme.borderLight}`,
              width: '100%',
            }}
          >
            <div style={{
              fontFamily: theme.displayTight,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              fontWeight: 600,
              letterSpacing: '-0.005em',
              color: theme.ink,
            }}>
              Nicola Mann
            </div>
            <div style={{
              fontFamily: theme.body,
              fontSize: 14,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#555555',
              marginTop: 6,
            }}>
              Founder, The XDGE
            </div>
          </div>
        </Group>
      </div>
    </section>
  );
}
