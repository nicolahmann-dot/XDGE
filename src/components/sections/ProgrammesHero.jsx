import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';
import { SplitHeading } from '../primitives/SplitHeading';

function ProgrammesHeading() {
  return (
    <SplitHeading
      tag="h1"
      lineClasses={['xdge-condensed-hollow xdge-condensed-hollow-tight', 'xdge-condensed-hollow']}
      lineClipClasses={[
        'xdge-clip-tight-y xdge-about-us-clip',
        'xdge-clip-tight-y xdge-condensed-clip-narrow',
      ]}
      lineInnerClasses={[undefined, 'xdge-condensed-text-narrow']}
      lines={['OUR', 'PROGRAMMES']}
      style={{
        fontFamily: theme.displayCondensed,
        fontSize: 'clamp(56px, 13vw, 220px)',
        lineHeight: 0.72,
      }}
    />
  );
}

export function ProgrammesHero() {
  return (
    <section
      data-screen-label="01 Programmes Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient
        src="/assets/videos/thunder_2.mp4"
        overlayOpacity={0.28}
        edgeFade="to left"
        videoStyle={{
          position: 'absolute',
          top: 0, left: 0, right: 'auto',
          width: '58%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 120px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <ProgrammesHeading />
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <div
            style={{
              display: 'flex', flexDirection: 'column',
              maxWidth: 560,
            }}
          >
            {/* bold heading + divider line + body — same as the About hero block */}
            <h3 style={{
              fontFamily: theme.body,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              lineHeight: 1.25, fontWeight: 600,
              color: theme.base, margin: 0,
            }}>
              Helping young people become the person opportunities are looking for.
            </h3>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.35)',
              margin: 'clamp(18px, 2.4vw, 28px) 0',
            }} />
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(16px, 1.7vw, 19px)',
              lineHeight: 1.6,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}>
              Designed to help young people build the confidence,
              capability, and leadership to stand out, seize their next
              opportunity, and shape their future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
