import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function ApplyClosing() {
  return (
    <section
      data-screen-label="Apply Closing"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(40px, 6vw, 88px)' }}>
          <SplitHeading
            tag="h2"
            lines={[
              <span className="xdge-condensed-solid-ink">Submit Your</span>,
              <span className="xdge-condensed-solid-ink xdge-apply-enquiry-line2">Enquiry</span>,
            ]}
            lineClipClasses={['xdge-light-page-heading-clip', 'xdge-light-page-heading-clip']}
            style={{
              fontFamily: theme.displayCondensed,
              fontSize: 'clamp(30px, 8.5vw, 150px)',
              lineHeight: 0.88,
              margin: 0,
              textTransform: 'uppercase',
              maxWidth: '14ch',
            }}
          />

          <div
            data-reveal="right"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.4vw, 28px)',
              maxWidth: 640,
            }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(17px, 1.7vw, 20px)',
              lineHeight: 1.5,
              margin: 0,
              color: theme.ink,
              fontWeight: 500,
            }}>
              Every young person has their own strengths, ambitions, and dreams.
              We personally review every enquiry to understand your goals,
              interests, schedule, and aspirations so we can recommend the
              pathway that will best support your growth and future success.
            </p>

            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(15px, 1.55vw, 17px)',
              lineHeight: 1.6,
              margin: 0,
              color: '#555555',
            }}>
              We will then be in touch to discuss whether XDGE is the right fit
              and how we can help you build the confidence, leadership
              capability, and experiences needed to achieve your goals and make
              the most of future opportunities.
            </p>

            <div
              style={{
                marginTop: 'clamp(20px, 2.4vw, 32px)',
                paddingTop: 'clamp(22px, 2.6vw, 32px)',
                borderTop: `1px solid ${theme.borderLight}`,
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
          </div>
        </Group>
      </div>
    </section>
  );
}
