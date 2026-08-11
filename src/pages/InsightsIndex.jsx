import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme, fadeUp, cardStagger, cardRise } from '../theme';
import { insightPosts } from '../data/insights';
import { usePageMeta } from '../hooks/usePageMeta';
import { Group } from '../components/primitives/Reveal';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { ParallaxImage } from '../components/primitives/ParallaxImage';

export default function InsightsIndex() {
  usePageMeta();

  return (
    <div className="xg-insights-page">
      <section
        data-screen-label="Insights Index Hero"
        data-section-theme="dark"
        style={{
          background: theme.dark,
          color: theme.base,
          padding: 'clamp(120px, 14vw, 160px) clamp(20px, 4vw, 40px) clamp(48px, 6vw, 72px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <SplitHeading
              lines={['INSIGHTS']}
              lineClasses={['xdge-condensed-hollow xdge-tier-hollow']}
              lineClipClasses={['xdge-insights-clip']}
              style={{
                fontFamily: theme.displayCondensed,
                fontSize: 'clamp(48px, 11.3vw, 160px)',
                lineHeight: 0.75,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            />
            <motion.p data-no-reveal variants={fadeUp} style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.55,
              color: theme.subtitle,
              maxWidth: 480,
            }}>
              Leadership, mindset, and performance — perspectives from the XDGE team.
            </motion.p>
          </Group>
        </div>
      </section>

      <section
        data-screen-label="Insights Index Grid"
        data-section-theme="dark"
        style={{
          background: theme.dark,
          color: theme.base,
          padding: '0 clamp(20px, 4vw, 40px) clamp(72px, 9vw, 120px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Group className="xg-3" variants={cardStagger}>
            {insightPosts.map((p) => (
              <motion.div key={p.slug} data-no-reveal variants={cardRise}>
                <Link
                  to={`/insights/${p.slug}`}
                  data-cursor="grow"
                  className="xg-glass-solid xg-lift"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: theme.base,
                    overflow: 'hidden',
                    borderRadius: 8,
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
                      display: 'flex',
                      gap: 8,
                      fontSize: 11,
                      color: theme.subtitle,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}>
                      <span>{p.tag1}</span>
                      {p.tag2 && (<><span>·</span><span>{p.tag2}</span></>)}
                    </div>
                    <h2 style={{
                      fontFamily: theme.body,
                      fontSize: 'clamp(15px, 1.4vw, 18px)',
                      lineHeight: 1.35,
                      margin: 0,
                      fontWeight: 700,
                    }}>
                      {p.title}
                    </h2>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: theme.subtitle, margin: 0 }}>
                      {p.excerpt}
                    </p>
                    <span style={{ fontSize: 12, color: theme.subtitle }}>{p.readTime}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Group>
        </div>
      </section>
    </div>
  );
}
