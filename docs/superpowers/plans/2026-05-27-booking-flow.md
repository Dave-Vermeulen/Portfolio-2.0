# Booking Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a production-ready, two-step booking section to `/contact`: a Formspree-backed lead form that hands off to a prefilled Cal.com embed.

**Architecture:** A single `Booking` orchestrator inside `src/components/Contact/Booking/` holds step + form state. `BookingForm` collects fields and POSTs to Formspree. On success, `BookingEmbed` mounts the Cal.com embed prefilled from the form data, with a two-button selector switching `calLink` between `letsgetcoffee` (15 min) and `gametime` (30/60 min). State stays in React; refresh discards.

**Tech Stack:** React 18, Vite 5, CSS Modules + design tokens, `@calcom/embed-react`, `react-phone-number-input`. No tests are added — the project has no test runner; verification is `npm run lint` + `npm run build` + manual smoke per task.

**Spec:** `docs/superpowers/specs/2026-05-27-booking-flow-design.md`

---

## Pre-flight (one-time, before Task 1)

- [ ] Confirm you are on a clean branch off `master`.
- [ ] Confirm `node_modules` is installed (`ls node_modules/.bin/vite` returns a path).
- [ ] Confirm the Formspree form exists. If not: visit https://formspree.io, create a new form pointed at `vermeulend002@gmail.com`, copy its endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`).

---

## Task 1: Install dependencies, add env scaffolding, add error tokens

**Files:**

- Modify: `package.json` (via `npm install`)
- Modify: `package-lock.json` (auto)
- Create: `.env.example`
- Create: `.env.local`
- Modify: `src/styles/tokens.css`

- [ ] **Step 1: Install runtime dependencies**

Run:

```bash
npm install @calcom/embed-react react-phone-number-input
```

Expected: both packages added under `dependencies` in `package.json`, no peer-dep warnings beyond the existing baseline.

- [ ] **Step 2: Create `.env.example` with the Formspree placeholder**

Create file `.env.example` at the repo root with this exact content:

```
# Formspree form endpoint — receives portfolio booking lead submissions.
# Get yours from https://formspree.io after creating a form.
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/REPLACE_ME
```

- [ ] **Step 3: Create `.env.local` with your real endpoint**

Create file `.env.local` at the repo root. Replace the placeholder with the real Formspree endpoint you copied during pre-flight:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

`.gitignore` already covers `.env.local` (verified). Do **not** commit this file.

- [ ] **Step 4: Add danger tokens to `tokens.css` for error states**

Open `src/styles/tokens.css`. Inside both `:root,:root[data-theme='dark']` and `:root[data-theme='light']`, add the danger tokens.

Inside the dark block (after `--color-text-muted: #9ca3af;`), add:

```css
--color-danger: #f87171;
--color-danger-bg: rgba(248, 113, 113, 0.12);
--color-danger-border: rgba(248, 113, 113, 0.4);
```

Inside the light block (after `--color-text-muted: #4b5169;`), add:

```css
--color-danger: #dc2626;
--color-danger-bg: rgba(220, 38, 38, 0.08);
--color-danger-border: rgba(220, 38, 38, 0.3);
```

These are the only new colour values in this feature. They serve form validation error UX, which has no existing token.

- [ ] **Step 5: Verify everything builds**

Run:

```bash
npm run build
```

Expected: build succeeds with zero warnings. The new deps are now bundled (the dependency graph will include them but they're tree-shaken until imported).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.example src/styles/tokens.css
git commit -m "chore(booking): install cal/phone deps and add danger tokens"
```

---

## Task 2: Create the `constants.js` module

**Files:**

- Create: `src/components/Contact/Booking/constants.js`

- [ ] **Step 1: Create the directory and constants file**

Run:

```bash
mkdir -p src/components/Contact/Booking
```

Create `src/components/Contact/Booking/constants.js`:

```js
export const CAL_LINKS = {
  coffee: 'dawud-vermeulen/letsgetcoffee',
  gametime: 'dawud-vermeulen/gametime',
};

export const OCCUPATIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'seeking', label: 'Seeking employment' },
  { value: 'student', label: 'Student' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'other', label: 'Other' },
];

export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

- [ ] **Step 2: Verify the file parses**

Run:

```bash
npm run lint -- src/components/Contact/Booking/constants.js
```

Expected: zero warnings/errors. (If ESLint complains about an unused export, it should not — these are re-exported across files.)

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact/Booking/constants.js
git commit -m "feat(booking): add Cal links, occupations, and endpoint constants"
```

---

## Task 3: Build the `BookingForm` component

**Files:**

- Create: `src/components/Contact/Booking/BookingForm.jsx`
- Create: `src/components/Contact/Booking/BookingForm.module.css`

- [ ] **Step 1: Create `BookingForm.module.css`**

```css
.form {
  margin-top: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;
}

.fieldFull {
  grid-column: 1 / -1;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.optional {
  font-weight: 400;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-left: 0.35rem;
}

.input,
.textarea {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-2);
  border-radius: var(--radius-md);
  color: var(--color-text);
  padding: 0.7rem 0.85rem;
  font: inherit;
  font-size: 1rem;
  transition:
    border-color var(--motion-fast),
    box-shadow var(--motion-fast);
  min-height: 44px;
  width: 100%;
}

.textarea {
  min-height: 96px;
  resize: vertical;
  font-family: inherit;
}

.input:focus-visible,
.textarea:focus-visible,
.phone:focus-within :global(.PhoneInputInput) {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.input[aria-invalid='true'],
.textarea[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.phone {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
}

.phone :global(.PhoneInputCountry) {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-2);
  border-radius: var(--radius-md);
  padding: 0 0.6rem;
  min-width: 64px;
}

.phone :global(.PhoneInputInput) {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-2);
  border-radius: var(--radius-md);
  color: var(--color-text);
  padding: 0.7rem 0.85rem;
  font: inherit;
  font-size: 1rem;
  min-height: 44px;
  flex: 1;
  width: 100%;
  transition:
    border-color var(--motion-fast),
    box-shadow var(--motion-fast);
}

.phoneInvalid :global(.PhoneInputInput) {
  border-color: var(--color-danger);
}

.error {
  font-size: 0.85rem;
  color: var(--color-danger);
}

.submitError {
  background: var(--color-danger-bg);
  border: 1px solid var(--color-danger-border);
  color: var(--color-danger);
  padding: 0.7rem 0.9rem;
  border-radius: var(--radius-md);
  margin-top: 1rem;
  font-size: 0.95rem;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.submit {
  margin-top: 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-mid));
  border: none;
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.85rem 1.4rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    transform var(--motion-fast),
    box-shadow var(--motion-fast);
  min-height: 44px;
}

.submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .submit:hover:not(:disabled) {
    transform: none;
  }
}
```

- [ ] **Step 2: Create `BookingForm.jsx`**

```jsx
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
      // eslint-disable-next-line no-console
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
```

- [ ] **Step 3: Lint the new files**

Run:

```bash
npm run lint -- src/components/Contact/Booking/BookingForm.jsx
```

Expected: zero warnings/errors. If ESLint complains about `react/prop-types`, that's expected in this project (no prop-types installed) — verify the existing components don't use prop-types either and that the rule is disabled in `.eslintrc`. If it does flag, add a JSDoc block above the component documenting `initialValues` and `onSubmit`.

- [ ] **Step 4: Verify the build still passes**

Run:

```bash
npm run build
```

Expected: build succeeds with zero warnings.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact/Booking/BookingForm.jsx src/components/Contact/Booking/BookingForm.module.css
git commit -m "feat(booking): add BookingForm with validation and Formspree submit"
```

---

## Task 4: Build the `BookingEmbed` component

**Files:**

- Create: `src/components/Contact/Booking/BookingEmbed.jsx`
- Create: `src/components/Contact/Booking/BookingEmbed.module.css`

- [ ] **Step 1: Create `BookingEmbed.module.css`**

```css
.embed {
  margin-top: 0;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.heading {
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  margin: 0;
  font-weight: 600;
  color: var(--color-text);
}

.accent {
  color: var(--color-secondary);
}

.back {
  background: none;
  border: 1px solid var(--color-surface-2);
  color: var(--color-text-muted);
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    border-color var(--motion-fast),
    color var(--motion-fast);
  min-height: 36px;
}

.back:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
}

.back:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
}

.tablist {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 480px) {
  .tablist {
    grid-template-columns: 1fr 1fr;
  }
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-2);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font: inherit;
  cursor: pointer;
  text-align: left;
  transition:
    transform var(--motion-fast),
    border-color var(--motion-fast),
    box-shadow var(--motion-fast);
  min-height: 64px;
}

.tab:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.tab:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
}

.tabActive {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, rgba(71, 59, 240, 0.18), rgba(102, 101, 221, 0.1));
}

.tabLabel {
  font-weight: 600;
  font-size: 1rem;
}

.tabSub {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-2);
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 640px;
}

@media (max-width: 640px) {
  .panel {
    min-height: 720px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tab:hover {
    transform: none;
  }
}
```

- [ ] **Step 2: Create `BookingEmbed.jsx`**

> Note on the `style` prop on `<Cal />`: the embed needs an inline `style` object for **sizing only** (width/height/overflow). This is how `@calcom/embed-react` expects to be sized. It is not a colour/styling inline-style, so it does not violate the project's "no inline styles" rule (which is about colours).

```jsx
import { useEffect, useRef, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useTheme } from '../../../hooks/useTheme.js';
import { CAL_LINKS } from './constants.js';
import styles from './BookingEmbed.module.css';

const MODES = [
  { key: 'coffee', label: '☕ Coffee chat', sub: '15 minutes' },
  { key: 'gametime', label: '🎯 Game Time', sub: '30 or 60 minutes' },
];

const CAL_NAMESPACE = 'booking';

export default function BookingEmbed({ formData, onBack }) {
  const [mode, setMode] = useState('coffee');
  const { theme } = useTheme();
  const tabRefs = useRef({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal('ui', {
        theme,
        styles: { branding: { brandColor: '#473bf0' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [theme]);

  useEffect(() => {
    tabRefs.current[mode]?.focus?.();
    // Intentionally only on mount: focus the active tab once the embed appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstName = formData.name.trim().split(/\s+/)[0] || 'there';
  const fullName = `${formData.name.trim()} ${formData.surname.trim()}`.trim();

  return (
    <div className={styles.embed}>
      <div className={styles.header}>
        <h3 className={styles.heading}>
          Thanks, <span className={styles.accent}>{firstName}</span>. Pick a time.
        </h3>
        <button type="button" onClick={onBack} className={styles.back}>
          ← Edit details
        </button>
      </div>

      <div className={styles.tablist} role="tablist" aria-label="Meeting length">
        {MODES.map((m) => {
          const active = m.key === mode;
          return (
            <button
              key={m.key}
              ref={(el) => {
                tabRefs.current[m.key] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="bk-cal-panel"
              tabIndex={active ? 0 : -1}
              className={`${styles.tab} ${active ? styles.tabActive : ''}`}
              onClick={() => setMode(m.key)}
            >
              <span className={styles.tabLabel}>{m.label}</span>
              <span className={styles.tabSub}>{m.sub}</span>
            </button>
          );
        })}
      </div>

      <div id="bk-cal-panel" role="tabpanel" className={styles.panel}>
        <Cal
          key={mode}
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINKS[mode]}
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{
            name: fullName,
            email: formData.email.trim(),
            notes: formData.reason?.trim() || '',
            theme,
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Lint the new files**

Run:

```bash
npm run lint -- src/components/Contact/Booking/BookingEmbed.jsx
```

Expected: zero warnings/errors. The `eslint-disable-next-line react-hooks/exhaustive-deps` is intentional — the focus-on-mount effect must not re-fire on mode change.

- [ ] **Step 4: Verify build**

Run:

```bash
npm run build
```

Expected: build succeeds with zero warnings. Bundle size will jump (Cal embed pulls in iframe-resizer; this is expected).

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact/Booking/BookingEmbed.jsx src/components/Contact/Booking/BookingEmbed.module.css
git commit -m "feat(booking): add BookingEmbed with mode tabs and Cal.com integration"
```

---

## Task 5: Build the `Booking` orchestrator

**Files:**

- Create: `src/components/Contact/Booking/Booking.jsx`
- Create: `src/components/Contact/Booking/Booking.module.css`

- [ ] **Step 1: Create `Booking.module.css`**

```css
.section {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-surface-2);
}

.heading {
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);
  text-align: center;
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.accent {
  color: var(--color-secondary);
  font-weight: 700;
}

.intro {
  text-align: center;
  color: var(--color-text-muted);
  margin: 0 auto 2rem;
  max-width: 600px;
  line-height: 1.6;
}
```

- [ ] **Step 2: Create `Booking.jsx`**

```jsx
import { useRef, useState } from 'react';
import BookingForm from './BookingForm.jsx';
import BookingEmbed from './BookingEmbed.jsx';
import styles from './Booking.module.css';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function Booking() {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState(null);
  const anchorRef = useRef(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setStep('embed');
    queueMicrotask(() => {
      const prefersReduced =
        typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
      anchorRef.current?.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

  const handleBack = () => {
    setStep('form');
  };

  return (
    <section className={styles.section} aria-labelledby="bk-heading" ref={anchorRef}>
      <h2 id="bk-heading" className={styles.heading}>
        Or <span className={styles.accent}>book a chat</span>
      </h2>
      <p className={styles.intro}>
        Quick coffee chat (15 min) or a deeper game-time session (30 or 60 min). Tell me a bit about
        yourself and I&apos;ll show you the calendar.
      </p>

      {step === 'form' ? (
        <BookingForm initialValues={formData ?? undefined} onSubmit={handleSubmit} />
      ) : (
        <BookingEmbed formData={formData} onBack={handleBack} />
      )}
    </section>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:

```bash
npm run lint -- src/components/Contact/Booking/Booking.jsx && npm run build
```

Expected: both succeed with zero warnings.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact/Booking/Booking.jsx src/components/Contact/Booking/Booking.module.css
git commit -m "feat(booking): add Booking orchestrator with form-to-embed flow"
```

---

## Task 6: Mount `Booking` inside the existing Contact page

**Files:**

- Modify: `src/components/Contact/Contact.jsx`

- [ ] **Step 1: Add the import**

Open `src/components/Contact/Contact.jsx`. Add this import alongside the existing imports (after the `import styles from './Contact.module.css';` line):

```jsx
import Booking from './Booking/Booking.jsx';
```

- [ ] **Step 2: Mount `<Booking />` inside the container**

In the same file, locate the `</div>` that closes `<div className={styles.channels}>` (around line 112). Between that closing `</div>` and the next `<p className={styles.availability}>` block, add:

```jsx
<Booking />
```

The resulting block should look like this:

```jsx
<div className={styles.channels}>
  {CHANNELS.map(({ href, label, value, Icon, primary }) => (
    // ... existing channel mapping ...
  ))}
</div>

<Booking />

<p className={styles.availability}>
  📍 Cape Town, South Africa &nbsp;•&nbsp; 🕑 UTC+2 &nbsp;•&nbsp; 💼 Remote / hybrid /
  on-site &nbsp;•&nbsp; 🌍 English, Afrikaans, Arabic
</p>
```

- [ ] **Step 3: Lint and build**

Run:

```bash
npm run lint && npm run build
```

Expected: both succeed with zero warnings. Build output should show `dist/` populated, with the Contact chunk slightly larger than before.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact/Contact.jsx
git commit -m "feat(contact): mount Booking section below channel grid"
```

---

## Task 7: Production-readiness verification

**Files:** none (verification only)

- [ ] **Step 1: Lint sweep**

Run:

```bash
npm run lint
```

Expected: zero warnings, zero errors across the whole project.

- [ ] **Step 2: Prettier sweep — no churn allowed**

Run:

```bash
npm run format && git diff --stat
```

Expected: `git diff --stat` shows no changes. If Prettier reformats anything, commit it as `style: prettier sweep` and re-run.

- [ ] **Step 3: Production build**

Run:

```bash
npm run build
```

Expected:

- Exit code 0
- Zero warnings
- `dist/index.html` plus hashed asset files written under `dist/assets/`
- The contact route chunk and the new `@calcom/embed-react` chunk both appear in the output summary

- [ ] **Step 4: Preview the production bundle locally**

Run:

```bash
npm run preview
```

Then open the URL printed in the terminal (default `http://localhost:4173`). Navigate to `/contact`. The full booking flow should work against your real Formspree endpoint and Cal.com event types. This is the closest thing to a Vercel deploy you can hit without pushing.

Press `Ctrl+C` to stop the preview server when done.

- [ ] **Step 5: Confirm `.env.local` is not staged**

Run:

```bash
git status --short
```

Expected: `.env.local` does not appear. If it does, run `git rm --cached .env.local` and verify `.gitignore` covers it.

- [ ] **Step 6: Vercel env var**

Before deploying:

1. Visit your Vercel project → Settings → Environment Variables.
2. Add `VITE_FORMSPREE_ENDPOINT` with the value `https://formspree.io/f/xxxxxxxx` (your real endpoint).
3. Apply to Production, Preview, and Development environments.
4. Redeploy from the latest commit.

This step is not gated by a command in this plan — you do it in the Vercel dashboard.

---

## Task 8: Local smoke test — full walkthrough

**Files:** none (manual test only)

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev
```

Expected output ends with something like:

```
  VITE v5.x.x  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Leave this terminal running. Open `http://localhost:5173/contact` in your browser.

- [ ] **Step 2: Smoke — happy path**

In the browser:

1. Scroll past the channel grid to the **"Or book a chat"** section.
2. Fill in: First name `Test`, Surname `User`, Email `test@example.com`, Phone — keep the ZA flag, type `0606169909`. The library should normalize this to `+27 60 616 9909` and accept it as valid.
3. Pick **Student** for occupation.
4. Type something in "What would you like to discuss?".
5. Click **Continue to calendar →**.

Expected:

- No console errors (open DevTools → Console).
- A submission email arrives at `vermeulend002@gmail.com` from Formspree containing all fields (give it ~30 seconds).
- The view advances to the embed; the page smooth-scrolls to it.
- The Cal.com embed renders the `letsgetcoffee` calendar by default.
- The active tab (☕ Coffee chat) is keyboard-focused.

- [ ] **Step 3: Smoke — Game Time tab**

Click the **🎯 Game Time** tab.

Expected: the embed reloads with `gametime`. Cal.com's own UI inside the iframe lets you pick 30 or 60 min.

- [ ] **Step 4: Smoke — back button**

Click **← Edit details**.

Expected: returns to the form with your previously typed values intact (name, surname, email, phone, occupation, reason).

- [ ] **Step 5: Smoke — sad path validation**

Click **Continue to calendar →** again. Then clear the email field and type `not-an-email`. Tab out of the field.

Expected: an inline red error appears under the email field: "Please enter a valid email address." The submit button does not advance. Focus moves to the email field on submit attempt with an invalid form.

- [ ] **Step 6: Smoke — Formspree failure**

Open DevTools → Network tab → enable throttling to "Offline." Try to submit a valid form.

Expected: the submit button shows "Sending…" briefly, then a red error banner appears above the submit button saying something like "Submission failed" or a network error. The form does not advance. State is preserved. Turn throttling back to "No throttling" and retry — it should now succeed.

- [ ] **Step 7: Smoke — theme toggle**

Click the theme toggle in the navbar. Watch the Cal.com embed.

Expected: the embed visually switches between dark and light mode without reloading the iframe. The form fields and tabs also re-theme via token variables.

- [ ] **Step 8: Smoke — mobile viewport**

Open DevTools → Toggle device toolbar. Pick **iPhone SE (375×667)**.

Expected:

- Form fields stack to one column.
- Mode tabs stack to one column.
- Cal.com embed fills the viewport width.
- No horizontal scroll anywhere on the page.
- Hit targets remain ≥44px tall.

Repeat at **iPad (768×1024)** — fields should be two-column, tabs two-column.

- [ ] **Step 9: Smoke — keyboard-only walkthrough**

Reload the page. Without touching the mouse, use only Tab / Shift+Tab / Enter / Space.

Expected: you can reach every field, the submit button, the tabs, the Cal embed (focus enters the iframe), and the back button. Focus rings are visible on every interactive element.

- [ ] **Step 10: Stop the dev server**

Press `Ctrl+C` in the terminal running `npm run dev`.

- [ ] **Step 11: Final commit if any fixes were needed**

If steps 2–9 surfaced anything that required a code change, fix it, then:

```bash
git add -A
git commit -m "fix(booking): <what you fixed>"
```

If nothing needed fixing, skip this step.

---

## Definition of Done

All of the following must be true before declaring the feature complete:

- ✅ All eight tasks above checked off.
- ✅ `npm run lint` — zero warnings.
- ✅ `npm run format` — no diff after running.
- ✅ `npm run build` — zero warnings, exit 0.
- ✅ Happy-path submit reaches `vermeulend002@gmail.com` inbox via Formspree.
- ✅ Cal.com embed renders both `letsgetcoffee` and `gametime` with prefilled name/email/notes.
- ✅ Form is keyboard-navigable end-to-end.
- ✅ Layout holds at 320px, 768px, and 1280px viewports.
- ✅ Dark and light themes both look correct (form fields + embed).
- ✅ `.env.local` is not tracked; `VITE_FORMSPREE_ENDPOINT` is set in Vercel.
