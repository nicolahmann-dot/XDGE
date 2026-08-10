import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme, fadeUp } from '../theme';
import { getInsightBySlug } from '../data/insights';
import { usePageMeta } from '../hooks/usePageMeta';
import { Group } from '../components/primitives/Reveal';
import NotFound from './NotFound';

export default function InsightArticle() {
  const { slug } = useParams();
  const post = getInsightBySlug(slug);

  usePageMeta(post ? {
    title: `${post.title} — XDGE Insights`,
    description: post.excerpt,
    ogImage: post.img,
  } : {});

  if (!post) return <NotFound />;

  return (
    <article className="xg-insight-article">
      <section
        data-screen-label="Insight Article Hero"
        data-section-theme="dark"
        style={{
          background: theme.dark,
          color: theme.base,
          padding: 'clamp(120px, 14vw, 160px) clamp(20px, 4vw, 40px) clamp(48px, 6vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Group>
            <motion.div data-no-reveal variants={fadeUp} style={{ marginBottom: 20 }}>
              <Link to="/insights" style={{ color: theme.subtitle, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                ← All Insights
              </Link>
            </motion.div>
            <motion.div data-no-reveal variants={fadeUp} style={{
              display: 'flex',
              gap: 8,
              fontSize: 11,
              color: theme.subtitle,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 16,
            }}>
              <span>{post.tag1}</span>
              {post.tag2 && (<><span>·</span><span>{post.tag2}</span></>)}
              <span>·</span>
              <span>{post.readTime}</span>
            </motion.div>
            <motion.h1 data-no-reveal variants={fadeUp} style={{
              margin: '0 0 24px',
              fontFamily: theme.displayTight,
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}>
              {post.title}
            </motion.h1>
            <motion.p data-no-reveal variants={fadeUp} style={{
              margin: 0,
              fontFamily: theme.body,
              fontSize: 'clamp(17px, 1.7vw, 20px)',
              lineHeight: 1.6,
              color: theme.subtitle,
            }}>
              {post.excerpt}
            </motion.p>
          </Group>
        </div>
      </section>

      <section
        data-screen-label="Insight Article Body"
        data-section-theme="light"
        style={{
          background: theme.base,
          color: theme.ink,
          padding: 'clamp(48px, 6vw, 72px) clamp(20px, 4vw, 40px) clamp(72px, 9vw, 120px)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <img
            src={post.img}
            alt={post.title}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 'clamp(32px, 5vw, 48px)',
            }}
          />
          <div className="xg-insight-body">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div style={{
            marginTop: 'clamp(40px, 6vw, 56px)',
            paddingTop: 32,
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}>
            <p style={{ margin: '0 0 16px', fontFamily: theme.body, color: '#555' }}>
              Ready to take the next step?
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/apply" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
                Apply
              </Link>
              <Link to="/contact" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-outline xg-cta-stand-btn-dark">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
