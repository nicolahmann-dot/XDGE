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
  'Early Leader Foundations (1:1)',
  'Junior MBA',
  'Business English & Workplace Fluency',
  'Incubator Pathways',
  'Not Sure Yet',
];

const achievementOptions = [
  'Build Confidence',
  'Develop Leadership Skills',
  'Improve Communication Skills',
  'Competitive School Entry',
  'Successful University Application',
  'Secure a Place at Your Chosen University',
  'Apprenticeships & Vocational Pathways',
  'Secure a Competitive Internship or Work Experience Opportunity',
  'Secure a Competitive Graduate or Early Career Role',
  'Career Development & Progression',
  'Be Identified for Leadership Potential',
  'Develop Greater Presence & Impact in My Role',
  'Develop Executive Presence & Professional Confidence',
  'Entrepreneurship & Business Creation',
  'Family Business Leadership',
  'Public Speaking & Presentations',
  'Academic Development',
  'Professional Skills & Workplace Readiness',
  'Research & Innovation',
  'Social Impact & Community Leadership',
  'Build a Strong Personal Portfolio',
  'Develop a Leadership Project',
  'Clarify Future Goals & Direction',
];

const formatOptions = ['Group Programme', '1-to-1 Mentoring', 'Either'];

const sourceOptions = [
  'School',
  'Parent Recommendation',
  'Friend or Family',
  'Social Media',
  'Website / Google Search',
  'Event or Workshop',
  'Other',
];

function CheckGrid({ name, options, values, onToggle }) {
  return (
    <div className="xg-form-check-grid">
      {options.map((opt) => (
        <FormCheckbox
          key={opt}
          name={name}
          value={opt}
          checked={values.includes(opt)}
          onChange={() => onToggle(opt)}
        >
          {opt}
        </FormCheckbox>
      ))}
    </div>
  );
}

export function ApplyForm() {
  const [form, setForm] = useState({
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    participantName: '',
    age: '',
    institution: '',
    programmes: [],
    achievements: [],
    achievementOther: '',
    goals12mo: '',
    goals5yr: '',
    format: [],
    source: [],
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const toggle = (key) => (value) => setForm((prev) => {
    const arr = prev[key];
    return {
      ...prev,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    };
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return;

    if (form.guardianEmail) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.guardianEmail.trim());
      if (!emailOk) {
        setError('Please enter a valid guardian email address.');
        return;
      }
    }

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      trackEvent('form_submit', { form_name: 'apply' });
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
        screenLabel="Apply Form"
        title="Thank you — your enquiry is in."
        body="Nicola and the team will personally review what you've shared."
        steps={[
          'We review your goals and programme interests',
          'We recommend the best XDGE pathway for you',
          'We follow up within 2–3 business days to discuss next steps',
        ]}
      />
    );
  }

  return (
    <section
      data-screen-label="Apply Form"
      data-section-theme="light"
      className="xg-form-section-shell"
      style={{ background: theme.base, color: theme.ink }}
    >
      <form onSubmit={onSubmit} className="xg-form xg-form--wide">
        <Group className="xg-form-stack">
          <FormIntro
            eyebrow="Apply"
            title="Start your enquiry"
            lede="Tell us about the participant, your goals, and what you're hoping XDGE can help with. The more context you share, the better we can recommend the right pathway."
          />

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>Parent / Guardian Information</legend>
            <p className={f.sectionHintClass}>(Required if the participant is under 18 years of age)</p>

            <div className={`${f.groupClass} xg-form-group--spaced`} style={{ marginTop: 'clamp(24px, 3vw, 32px)' }}>
              <label className={f.fieldClass}>
                <span className={f.labelClass}>Parent / Guardian Name</span>
                <input type="text" value={form.guardianName} onChange={set('guardianName')} className={f.inputClass} autoComplete="name" />
              </label>
              <div className="xg-2">
                <label className={f.fieldClass}>
                  <span className={f.labelClass}>Email Address</span>
                  <input type="email" value={form.guardianEmail} onChange={set('guardianEmail')} className={f.inputClass} autoComplete="email" />
                </label>
                <label className={f.fieldClass}>
                  <span className={f.labelClass}>Phone Number</span>
                  <input type="tel" value={form.guardianPhone} onChange={set('guardianPhone')} className={f.inputClass} autoComplete="tel" />
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>Participant Information</legend>

            <div className={`${f.groupClass} xg-form-group--spaced`} style={{ marginTop: 'clamp(24px, 3vw, 32px)' }}>
              <label className={f.fieldClass}>
                <span className={f.labelClass}>Participant Name</span>
                <input required type="text" value={form.participantName} onChange={set('participantName')} className={f.inputClass} />
              </label>
              <div className="xg-2">
                <label className={f.fieldClass}>
                  <span className={f.labelClass}>Age</span>
                  <input type="text" inputMode="numeric" value={form.age} onChange={set('age')} className={f.inputClass} />
                </label>
                <label className={f.fieldClass}>
                  <span className={f.labelClass}>Current School, College, University or Workplace</span>
                  <input type="text" value={form.institution} onChange={set('institution')} className={f.inputClass} />
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>Which Programme Interests You?</legend>
            <p className={f.sectionHintClass}>(Select all that apply)</p>
            <div style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
              <CheckGrid
                name="programmes"
                options={programmeOptions}
                values={form.programmes}
                onToggle={toggle('programmes')}
              />
            </div>
          </fieldset>

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>What Are You Hoping To Achieve?</legend>
            <p className={f.sectionHintClass}>(Select all that apply)</p>
            <div style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
              <CheckGrid
                name="achievements"
                options={achievementOptions}
                values={form.achievements}
                onToggle={toggle('achievements')}
              />
            </div>

            <label className={f.fieldClass} style={{ marginTop: 'clamp(24px, 3vw, 32px)' }}>
              <span className={f.labelClass}>If Other, Please Explain (50 words maximum)</span>
              <textarea
                rows={3}
                value={form.achievementOther}
                onChange={set('achievementOther')}
                maxLength={400}
                className={f.textareaClass}
                style={{ minHeight: 96 }}
              />
            </label>
          </fieldset>

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>Your Goals</legend>

            <div className={`${f.groupClass} xg-form-group--spaced`} style={{ marginTop: 'clamp(24px, 3vw, 32px)' }}>
              <label className={f.fieldClass}>
                <span className={f.labelClass}>What would you like to achieve in the next 12 months?</span>
                <textarea rows={4} value={form.goals12mo} onChange={set('goals12mo')} className={f.textareaClass} />
              </label>
              <label className={f.fieldClass}>
                <span className={f.labelClass}>What would you like to achieve in the next 5 years?</span>
                <textarea rows={4} value={form.goals5yr} onChange={set('goals5yr')} className={f.textareaClass} />
              </label>
            </div>
          </fieldset>

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>Preferred Learning Format</legend>
            <div className="xg-form-check-row" style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
              {formatOptions.map((opt) => (
                <FormCheckbox
                  key={opt}
                  name="format"
                  value={opt}
                  checked={form.format.includes(opt)}
                  onChange={() => toggle('format')(opt)}
                >
                  {opt}
                </FormCheckbox>
              ))}
            </div>
          </fieldset>

          <fieldset data-reveal className={f.sectionClass}>
            <legend className={f.sectionTitleClass}>How Did You Hear About XDGE?</legend>
            <div style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
              <CheckGrid
                name="source"
                options={sourceOptions}
                values={form.source}
                onToggle={toggle('source')}
              />
            </div>
          </fieldset>

          <div data-reveal className="xg-form-actions">
            <FormHoneypot value={form.website} onChange={set('website')} />
            <FormError message={error} />
            <FormSubmitButton
              sending={sending}
              idleLabel="Submit Your Enquiry"
              sendingLabel="Submitting…"
            />
          </div>
        </Group>
      </form>
    </section>
  );
}
