import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme, fadeUp } from '../theme';
import { faqGroups } from '../data/faq';
import { usePageMeta } from '../hooks/usePageMeta';
import { Group } from '../components/primitives/Reveal';
import { SplitHeading } from '../components/primitives/SplitHeading';

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="xg-faq-item" data-cursor="grow">
      <button
        type="button"
        className="xg-faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <span className="xg-faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="xg-faq-answer">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  usePageMeta();
  const [openKey, setOpenKey] = useState('0-0');

  return (
    <div className="xg-faq-page">
      <section
        data-screen-label="FAQ Hero"
        data-section-theme="dark"
        style={{
          background: theme.dark,
          color: theme.base,
          padding: 'clamp(120px, 14vw, 160px) clamp(20px, 4vw, 40px) clamp(48px, 6vw, 72px)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <Group>
            <motion.p data-no-reveal variants={fadeUp} style={{
              margin: '0 0 16px',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: theme.subtitle,
              fontWeight: 600,
            }}>
              FAQ
            </motion.p>
            <SplitHeading
              tag="h1"
              lines={['FREQUENTLY ASKED', 'QUESTIONS']}
              lineClasses={['xdge-condensed-solid-white', 'xdge-condensed-solid-white']}
              lineClipClasses={[
                'xdge-clip-tight-y xdge-about-us-clip',
                'xdge-clip-tight-y xdge-about-us-clip',
              ]}
              style={{
                fontFamily: theme.displayCondensed,
                fontSize: 'clamp(48px, 11vw, 120px)',
                lineHeight: 0.75,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: '0 0 20px',
              }}
            />
            <motion.p data-no-reveal variants={fadeUp} style={{
              margin: 0,
              fontFamily: theme.body,
              fontSize: 'clamp(16px, 1.6vw, 18px)',
              lineHeight: 1.6,
              color: theme.subtitle,
              maxWidth: '42em',
            }}>
              Everything you need to know about XDGE programmes, formats, and how to get started.
            </motion.p>
          </Group>
        </div>
      </section>

      <section
        data-screen-label="FAQ Content"
        data-section-theme="light"
        style={{
          background: theme.base,
          color: theme.ink,
          padding: 'clamp(56px, 7vw, 96px) clamp(20px, 4vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          {faqGroups.map((group, gi) => (
            <div key={group.title} style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
              <h2 style={{
                margin: '0 0 20px',
                fontFamily: theme.displayTight,
                fontSize: 'clamp(22px, 2.4vw, 28px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}>
                {group.title}
              </h2>
              <div className="xg-faq-list">
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  return (
                    <FaqItem
                      key={key}
                      item={item}
                      open={openKey === key}
                      onToggle={() => setOpenKey(openKey === key ? '' : key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="xg-faq-cta">
            <p style={{ margin: '0 0 16px', fontFamily: theme.body, fontSize: 16, color: '#555' }}>
              Still have questions?
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-primary">
                Contact Us
              </Link>
              <Link to="/apply" data-cursor="grow" className="xg-cta-stand-btn xg-cta-stand-btn-outline xg-cta-stand-btn-dark">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
