import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme, cardStagger, cardRise } from '../../theme';
import { insightPosts } from '../../data/insights';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { ParallaxImage } from '../primitives/ParallaxImage';

export function Insights() {
  return (
    <section data-screen-label="07 Insights" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px) clamp(32px, 4vw, 56px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 'clamp(32px, 6vw, 56px)', gap: 16 }}>
          <div>
            <SplitHeading
              lines={['INSIGHTS']}
              lineClasses={['xdge-condensed-hollow xdge-tier-hollow']}
              lineClipClasses={['xdge-insights-clip']}
              style={{
                fontFamily: theme.displayCondensed,
                fontSize: 'clamp(40px, 11.3vw, 200px)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            />
          </div>
          <motion.div data-no-reveal style={{ paddingBottom: 24 }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: theme.subtitle, margin: '0 0 24px', maxWidth: 480 }}>
              Get our latest thoughts and opinions on all things leadership, mindset, and performance.
            </p>
            <motion.div whileHover={{ x: 4 }}>
              <Link
                to="/insights"
                data-cursor="grow"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                  border: `1px solid ${theme.base}`, borderRadius: 999, color: theme.base,
                  textDecoration: 'none', fontSize: 13, fontWeight: 500,
                }}
              >All Insights <span style={{ fontSize: 16 }}>→</span></Link>
            </motion.div>
          </motion.div>
        </Group>
        <Group className="xg-3" variants={cardStagger}>
          {insightPosts.map((p) => (
            <motion.div data-no-reveal
              key={p.slug}
              variants={cardRise}
            >
              <Link
                to={`/insights/${p.slug}`}
                data-cursor="grow"
                className="xg-glass-solid xg-lift"
                style={{
                  display: 'block', textDecoration: 'none', color: theme.base,
                  overflow: 'hidden', borderRadius: 8,
                }}
              >
                <ParallaxImage
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '1/1' }}
                />
                <div style={{ padding: '22px 24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{
                    display: 'flex', gap: 8,
                    fontSize: 11, color: theme.subtitle,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>
                    <span>{p.tag1}</span>
                    {p.tag2 && (<><span>·</span><span>{p.tag2}</span></>)}
                  </div>
                  <h3 style={{
                    fontFamily: theme.body,
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    lineHeight: 1.35,
                    letterSpacing: '-0.005em',
                    margin: 0, fontWeight: 700,
                    color: theme.base,
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontSize: 13, lineHeight: 1.55,
                    color: theme.subtitle, margin: 0,
                  }}>
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </Group>
      </div>
    </section>
  );
}
