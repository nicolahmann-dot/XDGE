import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';
import { Group, Reveal } from '../primitives/Reveal';
import { HeroAmbient } from '../HeroAmbient';

const pStyle = {
  fontFamily: theme.body,
  fontSize: 'clamp(14px, 1.4vw, 16px)',
  lineHeight: 1.6,
  color: theme.subtitle,
  margin: 0,
};

export function ExperienceHero() {
  return (
    <section
      data-screen-label="01 Experience Hero"
      data-cursor="light"
      data-section-theme="dark"
      className="xg-experience-hero-section"
      style={{
        background: theme.dark,
        color: theme.base,
        minHeight: '120vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <HeroAmbient
        src="/assets/videos/hero.mp4"
        overlayOpacity={0.25}
        videoStyle={{ objectPosition: 'center 52%' }}
      />

      <div className="xg-experience-hero-lockup">
        <SplitHeading
          tag="h1"
          lines={[
            <span className="xdge-how-works-stack">
              <span className="xdge-how-works-kicker">HOW</span>
              <img
                src="/assets/New Logo/Artboard 3.png"
                alt="XDGE"
                className="xdge-how-works-logo-img"
                decoding="async"
              />
              <span className="xdge-how-works-kicker xdge-how-works-kicker-bottom">WORKS</span>
            </span>,
          ]}
          lineClipClasses={['xdge-clip-tight-y xdge-how-works-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            fontSize: 'clamp(60px, 15vw, 230px)',
            lineHeight: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: 0,
          }}
        />
      </div>

      <div className="xg-experience-hero-inner">
        <div className="xg-hero-body xg-experience-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <Group style={{ maxWidth: 640 }}>
            <div className="xg-experience-hero-tags" style={{
              fontFamily: theme.display,
              fontWeight: 900,
              fontSize: 'clamp(13px, 1.4vw, 20px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: theme.base,
              whiteSpace: 'nowrap',
            }}>
              <div>For Ages 11&ndash;24+</div>
              <div>Real Leadership Development.</div>
              <div>Real Projects.</div>
              <div>Industry Professionals &amp; Coaches.</div>
              <div>Real Results.</div>
            </div>

            <Reveal>
              <div style={{
                height: 1,
                background: 'rgba(255,255,255,0.2)',
                margin: 'clamp(20px, 2.4vw, 30px) 0',
              }} />
            </Reveal>

            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.6vw, 18px)' }}>
                <p style={pStyle}>
                  Experience the same leadership development trusted by organisations
                  worldwide, re-engineered for young people, graduates and early-career
                  professionals.
                </p>
                <p style={pStyle}>
                  Build and lead a project shaped around your interests, ambitions and
                  next step.
                </p>
                <p style={pStyle}>
                  Guided by vetted leaders, coaches and industry professionals, you develop
                  the confidence, professional skills and real-world evidence of initiative,
                  achievement and impact that helps you stand out.
                </p>
              </div>
            </Reveal>
          </Group>
        </div>
      </div>
    </section>
  );
}
