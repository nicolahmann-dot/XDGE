import { motion } from 'framer-motion';
import { theme, fadeUp, cardRise, cardStagger } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const rejectedItems = ['Good grades', 'Generic applications', 'No leadership evidence'];
const selectedItems = ['Clear thinking', 'Persuasive communication', 'Leadership and initiative'];

const REJECT = '#c85e5e';

export function Culture() {
  return (
    <section
      data-screen-label="04 Our Culture"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px) clamp(32px, 4vw, 56px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div>
            <div
              data-reveal="blur"
              style={{
                fontSize: 12, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: theme.subtitle,
                marginBottom: 28, fontWeight: 600,
              }}
            >(Considered vs Selected)</div>
            <SplitHeading
              lines={['OUR', 'CULTURE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(40px, 11.3vw, 200px)',
                lineHeight: 0.75, letterSpacing: '-0.02em',
              }}
            />
          </div>
          <p
            data-reveal
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
              margin: 0, paddingTop: 'clamp(0px, 4vw, 48px)',
              color: theme.subtitle, maxWidth: 480,
            }}
          >
            Same grades. Different outcomes. Selection is shaped by what only
            stand-out applicants bring to the room.
          </p>
        </Group>

        {/* Same reveal as the Insights cards on Home — cardRise inside a
            cardStagger Group, so the two panels lift in one after the other. */}
        <Group className="xg-2" variants={cardStagger} style={{ gap: 24, marginBottom: 'clamp(48px, 7vw, 80px)' }}>
          <motion.div
            data-no-reveal
            variants={cardRise}
            style={{
              border: `1px solid ${theme.borderLight}`,
              padding: 'clamp(28px, 4vw, 40px)',
              background: 'rgba(255,255,255,0.45)',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}
          >
            <div style={{
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(200,94,94,0.14)',
              color: REJECT,
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>Rejected</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rejectedItems.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    fontSize: 'clamp(15px, 1.7vw, 18px)',
                    color: theme.base,
                  }}
                >
                  <span style={{
                    color: REJECT, fontSize: 22, fontWeight: 700,
                    width: 22, textAlign: 'center', lineHeight: 1,
                  }}>×</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            data-no-reveal
            variants={cardRise}
            style={{
              border: `1px solid ${theme.borderLight}`,
              padding: 'clamp(28px, 4vw, 40px)',
              background: 'rgba(255,255,255,0.45)',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}
          >
            <div style={{
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              color: theme.accent,
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>Selected</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {selectedItems.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    fontSize: 'clamp(15px, 1.7vw, 18px)',
                    color: theme.base,
                  }}
                >
                  <span style={{
                    color: theme.accent, fontSize: 18, fontWeight: 700,
                    width: 22, textAlign: 'center', lineHeight: 1,
                  }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Group>

        <SplitHeading
          lines={['Grades get you considered.', 'Capability gets you selected.']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(42px, 7.5vw, 120px)',
            lineHeight: 1.05, letterSpacing: '-0.01em',
            maxWidth: 1100,
          }}
        />
      </div>
    </section>
  );
}
