import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Privacy() {
  usePageMeta();

  return (
    <LegalPage
      title="Privacy Policy"
      updated="10 August 2026"
      sections={[
        {
          heading: 'Who we are',
          body: `XDGE ("we", "us") provides leadership development programmes. Our registered office is at ${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.postcode}, ${site.address.country}. You can contact us at ${site.email}.`,
        },
        {
          heading: 'Information we collect',
          body: 'When you submit our Contact or Apply forms, we collect the information you provide — such as name, email, phone number, age, programme interests, and messages. We may also collect basic usage data if analytics are enabled on this website.',
        },
        {
          heading: 'How we use your information',
          body: 'We use your information to respond to enquiries, assess programme fit, deliver our services, and communicate with you about XDGE programmes. We do not sell your personal data to third parties.',
        },
        {
          heading: 'Legal basis',
          body: 'We process personal data on the basis of legitimate interest (responding to enquiries) and, where applicable, consent (e.g. marketing communications if you opt in).',
        },
        {
          heading: 'Data retention',
          body: 'We retain enquiry data for as long as necessary to manage your relationship with XDGE and comply with legal obligations. You may request deletion of your data by contacting us.',
        },
        {
          heading: 'Your rights',
          body: 'Under UK GDPR, you have the right to access, rectify, erase, restrict, or object to processing of your personal data, and to data portability where applicable. Contact us at the email above to exercise these rights.',
        },
        {
          heading: 'Cookies & analytics',
          body: 'This site may use cookies for analytics (e.g. Google Analytics) if enabled. You can control cookies through your browser settings.',
        },
        {
          heading: 'Changes',
          body: 'We may update this policy from time to time. The latest version will always be published on this page.',
        },
      ]}
    />
  );
}

export function LegalPage({ title, updated, sections }) {
  return (
    <section
      data-screen-label={title}
      data-section-theme="light"
      style={{
        minHeight: '100vh',
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(120px, 14vw, 160px) clamp(20px, 4vw, 40px) clamp(72px, 9vw, 120px)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{
          margin: '0 0 12px',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#888',
          fontWeight: 600,
        }}>
          Legal
        </p>
        <h1 style={{
          margin: '0 0 8px',
          fontFamily: theme.displayTight,
          fontSize: 'clamp(32px, 5vw, 48px)',
          lineHeight: 1.1,
        }}>
          {title}
        </h1>
        <p style={{ margin: '0 0 40px', fontSize: 14, color: '#888' }}>
          Last updated: {updated}
        </p>
        {sections.map((s) => (
          <div key={s.heading} style={{ marginBottom: 32 }}>
            <h2 style={{
              margin: '0 0 12px',
              fontFamily: theme.body,
              fontSize: 18,
              fontWeight: 700,
            }}>
              {s.heading}
            </h2>
            <p style={{
              margin: 0,
              fontFamily: theme.body,
              fontSize: 15,
              lineHeight: 1.65,
              color: '#444',
            }}>
              {s.body}
            </p>
          </div>
        ))}
        <Link to="/" style={{ color: theme.ink, fontSize: 14, fontWeight: 500 }}>
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
