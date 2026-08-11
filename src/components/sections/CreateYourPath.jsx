import { theme } from '../../theme';
import { FloatingVideo } from '../primitives/FloatingVideo';
import { SplitHeading } from '../primitives/SplitHeading';

export function CreateYourPath() {
  return (
    <section
      data-screen-label="Create Your Own Path"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      <FloatingVideo
        src="/assets/videos/lightning_1.mp4"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(800px, 120vw, 2400px)',
          opacity: 0.4, zIndex: 0,
        }}
      />
      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10, overflow: 'visible' }}>
        <SplitHeading
          tag="h2"
          lines={['CREATE YOUR', 'OWN PATH', '& LEAVE A TRAIL']}
          lineInnerClasses={[
            'xdge-condensed-hollow xdge-create-path-kicker',
            'xdge-condensed-solid-white xdge-create-path-main',
            'xdge-condensed-hollow xdge-create-path-kicker',
          ]}
          lineClipClasses={[
            'xdge-create-path-line-clip xdge-about-us-clip',
            'xdge-create-path-line-clip xdge-condensed-clip-narrow xdge-about-us-clip',
            'xdge-create-path-line-clip xdge-about-us-clip',
          ]}
          style={{
            textAlign: 'left',
            fontFamily: theme.displayCondensed,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 0,
            margin: 0,
            padding: 0,
            textTransform: 'uppercase',
          }}
        />
      </div>
    </section>
  );
}
