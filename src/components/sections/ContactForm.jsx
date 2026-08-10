import { useState } from 'react';
import { theme } from '../../theme';
import { Group } from '../primitives/Reveal';
import {
  FormCheckbox,
  FormError,
  FormHoneypot,
  FormIntro,
  FormSubmitButton,
  FormSuccess,
  formFieldProps as f,
} from '../forms/formShared';
import { trackEvent } from '../../utils/analytics';

const programmeOptions = [
  'School Application Edge',
  'University Application Edge',
  'Early Career Edge',
  'Early Leader Foundations',
  'Junior MBA',
  'Business English & Workplace Fluency',
  'Incubator Pathways',
  'Not Sure Yet',
];

const contactMethods = ['Email', 'Phone', 'Video Call'];

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    guardian: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    message: '',
    programmes: [],
    methods: [],
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const toggle = (key, value) => () => setForm((prev) => {
    const arr = prev[key];
    return {
      ...prev,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    };
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) {
      setError('Please enter a valid email address.');
      return;
    }

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      trackEvent('form_submit', { form_name: 'contact' });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <FormSuccess
        screenLabel="Contact Form"
        title="Thank you — your message is on its way."
        body="We'll be in touch within 2–3 business days."
        steps={[
          'Our team reviews your enquiry',
          'We respond with the right next step',
          'Optional: book a discovery call on our Contact page',
        ]}
      />
    );
  }

  return (
    <section
      data-screen-label="Contact Form"
      data-section-theme="light"
      className="xg-form-section-shell"
      style={{ background: theme.base, color: theme.ink }}
    >
      <form onSubmit={onSubmit} className="xg-form">
        <Group className="xg-form-stack">
          <FormIntro
            eyebrow="Contact"
            title="Send us a message"
            lede="Share a few details and we'll respond with the right next step — whether that's a programme recommendation, a discovery call, or a simple answer to your question."
          />

          <label data-reveal className={f.fieldClass}>
            <span className={f.labelClass}>Your Name</span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={set('name')}
              className={f.inputClass}
              autoComplete="name"
            />
          </label>

          <label data-reveal className={f.fieldClass}>
            <span className={f.labelClass}>Parent / Guardian Name</span>
            <input
              type="text"
              name="guardian"
              value={form.guardian}
              onChange={set('guardian')}
              className={f.inputClass}
            />
            <div className={f.hintClass}>(If participant is under 18 years of age)</div>
          </label>

          <div data-reveal className={`xg-2 ${f.groupClass}`}>
            <label className={f.fieldClass}>
              <span className={f.labelClass}>Email Address</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={set('email')}
                className={f.inputClass}
                autoComplete="email"
              />
            </label>
            <label className={f.fieldClass}>
              <span className={f.labelClass}>Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={set('phone')}
                className={f.inputClass}
                autoComplete="tel"
              />
            </label>
          </div>

          <div data-reveal className={`xg-2 ${f.groupClass}`}>
            <label className={f.fieldClass}>
              <span className={f.labelClass}>Location — City / Country</span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={set('location')}
                className={f.inputClass}
              />
            </label>
            <label className={f.fieldClass}>
              <span className={f.labelClass}>Participant Age</span>
              <input
                type="text"
                name="age"
                inputMode="numeric"
                value={form.age}
                onChange={set('age')}
                className={f.inputClass}
              />
            </label>
          </div>

          <div data-reveal className="xg-form-options">
            <div className={f.optionTitleClass}>Which Programme Are You Interested In?</div>
            <div className="xg-form-check-grid">
              {programmeOptions.map((opt) => (
                <FormCheckbox
                  key={opt}
                  name="programmes"
                  value={opt}
                  checked={form.programmes.includes(opt)}
                  onChange={toggle('programmes', opt)}
                >
                  {opt}
                </FormCheckbox>
              ))}
            </div>
          </div>

          <label data-reveal className={f.fieldClass}>
            <span className={f.labelClass}>How Can We Help?</span>
            <textarea
              name="message"
              value={form.message}
              onChange={set('message')}
              rows={5}
              className={f.textareaClass}
            />
          </label>

          <div data-reveal className="xg-form-options">
            <div className={f.optionTitleClass}>Preferred Contact Method</div>
            <div className="xg-form-check-row">
              {contactMethods.map((method) => (
                <FormCheckbox
                  key={method}
                  name="methods"
                  value={method}
                  checked={form.methods.includes(method)}
                  onChange={toggle('methods', method)}
                >
                  {method}
                </FormCheckbox>
              ))}
            </div>
          </div>

          <div data-reveal className="xg-form-actions">
            <FormHoneypot value={form.website} onChange={set('website')} />
            <FormError message={error} />
            <FormSubmitButton
              sending={sending}
              idleLabel="Send Message"
              sendingLabel="Sending…"
            />
          </div>
        </Group>
      </form>
    </section>
  );
}
