import { motion } from 'framer-motion';
import { theme } from '../../theme';

export function FormHoneypot({ value, onChange }) {
  return (
    <label className="xg-form-honeypot" aria-hidden="true">
      <span>Website</span>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export function FormCheckbox({ checked, children, ...inputProps }) {
  return (
    <label className={`xg-form-check${checked ? ' is-checked' : ''}`}>
      <input type="checkbox" className="xg-form-check-native" {...inputProps} />
      <span className="xg-form-check-box" aria-hidden="true">
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className="xg-form-check-text">{children}</span>
    </label>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return <div className="xg-form-error" role="alert">{message}</div>;
}

export function FormSubmitButton({ sending, idleLabel, sendingLabel = 'Sending…' }) {
  return (
    <button type="submit" disabled={sending} className="xg-form-submit">
      <span>{sending ? sendingLabel : idleLabel}</span>
      {!sending && <span className="xg-form-submit-arrow" aria-hidden="true">&rarr;</span>}
    </button>
  );
}

export function FormSuccess({ title, body, screenLabel, steps }) {
  return (
    <section
      data-screen-label={screenLabel}
      data-section-theme="light"
      className="xg-form-success-section"
    >
      <div className="xg-form-success-panel">
        <motion.h2
          data-no-reveal
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="xg-form-success-title"
        >
          {title}
        </motion.h2>
        <motion.p
          data-no-reveal
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="xg-form-success-body"
        >
          {body}
        </motion.p>
        {steps?.length > 0 && (
          <motion.ol
            data-no-reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="xg-form-success-steps"
          >
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </motion.ol>
        )}
      </div>
    </section>
  );
}

export function FormIntro({ eyebrow, title, lede }) {
  return (
    <header className="xg-form-intro">
      {eyebrow && <p className="xg-form-eyebrow">{eyebrow}</p>}
      {title && <h2 className="xg-form-title">{title}</h2>}
      {lede && <p className="xg-form-lede">{lede}</p>}
    </header>
  );
}

export const formFieldProps = {
  labelClass: 'xg-form-label',
  inputClass: 'xg-form-input',
  textareaClass: 'xg-form-textarea',
  hintClass: 'xg-form-hint',
  fieldClass: 'xg-form-field',
  groupClass: 'xg-form-group',
  optionTitleClass: 'xg-form-option-title',
  sectionClass: 'xg-form-section',
  sectionTitleClass: 'xg-form-section-title',
  sectionHintClass: 'xg-form-section-hint',
};
