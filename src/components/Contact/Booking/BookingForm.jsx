import { useEffect, useRef, useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { EMAIL_RE, FORMSPREE_ENDPOINT, OCCUPATIONS } from './constants.js';
import styles from './BookingForm.module.css';

const EMPTY = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  occupation: '',
  reason: '',
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your first name.';
  if (!values.surname.trim()) errors.surname = 'Please enter your surname.';
  if (!values.email.trim() || !EMAIL_RE.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone || !isPossiblePhoneNumber(values.phone)) {
    errors.phone = 'Please enter a valid phone number including country code.';
  }
  if (!OCCUPATIONS.some((o) => o.value === values.occupation)) {
    errors.occupation = 'Please tell me your current situation.';
  }
  if (values.reason.length > 1000) {
    errors.reason = 'Please keep this under 1000 characters.';
  }
  return errors;
}

export default function BookingForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues ?? EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    if (!FORMSPREE_ENDPOINT) {
      console.warn(
        '[Booking] VITE_FORMSPREE_ENDPOINT is not set. Form submissions will fail until it is configured in .env.local (locally) or in Vercel project env vars (production).'
      );
    }
  }, []);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      const target = refs.current[firstInvalid];
      if (typeof target?.focus === 'function') target.focus();
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setSubmitState('error');
      setSubmitError(
        'The booking form is not configured. Please email vermeulend002@gmail.com directly.'
      );
      return;
    }

    setSubmitState('submitting');
    setSubmitError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          surname: values.surname.trim(),
          email: values.email.trim(),
          phone: values.phone,
          occupation: values.occupation,
          reason: values.reason.trim(),
          _subject: `Portfolio booking enquiry — ${values.name.trim()} ${values.surname.trim()}`,
          _gotcha: '',
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status}). Please try again.`);
      }

      setSubmitState('idle');
      onSubmit({
        ...values,
        name: values.name.trim(),
        surname: values.surname.trim(),
        email: values.email.trim(),
        reason: values.reason.trim(),
      });
    } catch (err) {
      setSubmitState('error');
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const showError = (name) => touched[name] && errors[name];
  const phoneInvalid = Boolean(showError('phone'));

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitState === 'submitting'}
    >
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="bk-name">
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id="bk-name"
            ref={(el) => {
              refs.current.name = el;
            }}
            className={styles.input}
            type="text"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? 'bk-name-err' : undefined}
            aria-required="true"
            autoComplete="given-name"
          />
          {showError('name') && (
            <span id="bk-name-err" className={styles.error}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bk-surname">
            Surname <span aria-hidden="true">*</span>
          </label>
          <input
            id="bk-surname"
            ref={(el) => {
              refs.current.surname = el;
            }}
            className={styles.input}
            type="text"
            value={values.surname}
            onChange={(e) => setField('surname', e.target.value)}
            onBlur={() => handleBlur('surname')}
            aria-invalid={Boolean(showError('surname'))}
            aria-describedby={showError('surname') ? 'bk-surname-err' : undefined}
            aria-required="true"
            autoComplete="family-name"
          />
          {showError('surname') && (
            <span id="bk-surname-err" className={styles.error}>
              {errors.surname}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bk-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="bk-email"
            ref={(el) => {
              refs.current.email = el;
            }}
            className={styles.input}
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? 'bk-email-err' : undefined}
            aria-required="true"
            autoComplete="email"
          />
          {showError('email') && (
            <span id="bk-email-err" className={styles.error}>
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="bk-phone">
            Phone <span aria-hidden="true">*</span>
          </label>
          <PhoneInput
            international
            defaultCountry="ZA"
            value={values.phone}
            onChange={(value) => setField('phone', value || '')}
            onBlur={() => handleBlur('phone')}
            className={`${styles.phone} ${phoneInvalid ? styles.phoneInvalid : ''}`}
            numberInputProps={{
              id: 'bk-phone',
              ref: (el) => {
                refs.current.phone = el;
              },
              'aria-invalid': phoneInvalid,
              'aria-describedby': phoneInvalid ? 'bk-phone-err' : undefined,
              'aria-required': 'true',
              autoComplete: 'tel',
            }}
          />
          {showError('phone') && (
            <span id="bk-phone-err" className={styles.error}>
              {errors.phone}
            </span>
          )}
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.label} htmlFor="bk-occupation">
            Current situation <span aria-hidden="true">*</span>
          </label>
          <select
            id="bk-occupation"
            ref={(el) => {
              refs.current.occupation = el;
            }}
            className={styles.input}
            value={values.occupation}
            onChange={(e) => setField('occupation', e.target.value)}
            onBlur={() => handleBlur('occupation')}
            aria-invalid={Boolean(showError('occupation'))}
            aria-describedby={showError('occupation') ? 'bk-occupation-err' : undefined}
            aria-required="true"
          >
            <option value="">Select one…</option>
            {OCCUPATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {showError('occupation') && (
            <span id="bk-occupation-err" className={styles.error}>
              {errors.occupation}
            </span>
          )}
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.label} htmlFor="bk-reason">
            What would you like to discuss?
            <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            id="bk-reason"
            ref={(el) => {
              refs.current.reason = el;
            }}
            className={styles.textarea}
            value={values.reason}
            onChange={(e) => setField('reason', e.target.value)}
            onBlur={() => handleBlur('reason')}
            rows={3}
            maxLength={1000}
            aria-invalid={Boolean(showError('reason'))}
            aria-describedby={showError('reason') ? 'bk-reason-err' : undefined}
          />
          {showError('reason') && (
            <span id="bk-reason-err" className={styles.error}>
              {errors.reason}
            </span>
          )}
        </div>

        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          aria-hidden="true"
          className={styles.honeypot}
          value=""
          onChange={() => {}}
          autoComplete="off"
        />
      </div>

      {submitState === 'error' && submitError && (
        <p role="alert" className={styles.submitError}>
          {submitError}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={submitState === 'submitting'}>
        {submitState === 'submitting' ? 'Sending…' : 'Continue to calendar →'}
      </button>
    </form>
  );
}
