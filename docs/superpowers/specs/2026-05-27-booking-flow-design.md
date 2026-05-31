---
title: Booking Flow Design
date: 2026-05-27
status: draft
owner: Dawūd Vermeulen
---

# Booking Flow — Design Spec

## 1. Purpose

Add a qualified booking section to the existing `/contact` page that:

1. Collects visitor info via a short form (lead capture via Formspree).
2. Hands off to a Cal.com embed prefilled with that info for the actual time-slot booking.

The form captures leads even if the visitor bails before booking; Cal.com handles the calendar booking itself, the invite, and the confirmation email.

## 2. Scope

**In scope**

- New `Booking` feature mounted inside the existing `/contact` route.
- Two-step UX: form → calendar embed.
- Formspree integration for lead capture.
- `@calcom/embed-react` integration with prefilled config and theme sync.
- `react-phone-number-input` for the phone field.
- CSS Modules + design tokens; no new colour values, no Tailwind, no inline styles.
- Light/dark theme awareness via the existing `useTheme` hook.
- Accessibility: labelled inputs, focus management, reduced-motion respect.

**Out of scope**

- Site-wide visual redesign (separate spec to follow).
- Backend or database.
- Authentication or admin views.
- Booking analytics beyond what Formspree + Cal.com provide.
- Calendar provider other than Cal.com.

## 3. User Flow

```
[Contact page]
  │
  ├── Channel grid (existing — unchanged)
  │
  └── Booking section (new)
        │
        Step 1: Booking form
          • Name *               (text)
          • Surname *            (text)
          • Email *              (email)
          • Phone *              (react-phone-number-input)
          • Occupation *         (select: Employed / Seeking employment /
                                  Student / Volunteer / Other)
          • Why are you reaching out? (textarea, optional)
          │
          └── Submit
                ├── POST to Formspree endpoint
                │     ├── 2xx  → advance to Step 2
                │     └── err  → inline error, keep values, allow retry
                │
        Step 2: Calendar embed
          • Header: visitor's first name + brief copy
          • Mode selector (2 buttons):
                ☕ Coffee chat (15 min)   → calLink: dawud-vermeulen/letsgetcoffee
                🎯 Game Time (30 or 60)  → calLink: dawud-vermeulen/gametime
          • Cal.com embed (prefilled name, email, notes from form)
          • "Back" link → returns to Step 1 with values preserved
```

## 4. Architecture

### 4.1 File layout

```
src/components/Contact/
├── Contact.jsx                  (modified: import + mount <Booking /> below channel grid)
├── Contact.module.css           (modified: section divider)
└── Booking/
    ├── Booking.jsx              (orchestrator: step + form state, scroll-to-step-2)
    ├── Booking.module.css       (layout for the booking section + step transition)
    ├── BookingForm.jsx          (controlled form, validation, Formspree submit)
    ├── BookingForm.module.css   (form grid, field styling)
    ├── BookingEmbed.jsx         (mode selector + Cal.com embed)
    ├── BookingEmbed.module.css  (selector + embed container)
    └── constants.js             (CAL_LINKS, OCCUPATIONS, FORMSPREE_ENDPOINT env, regex)
```

### 4.2 Component contracts

**`Booking.jsx`** — orchestrator

- State: `step` (`'form' | 'embed'`), `formData` (object of all field values).
- Renders `<BookingForm />` when `step === 'form'`, `<BookingEmbed />` when `step === 'embed'`.
- Passes `onSubmit(data)` to the form; on success sets `formData` and advances `step`.
- Passes `formData` + `onBack()` to the embed.
- After advancing, scrolls the embed into view and moves focus to the mode selector (skipped under `prefers-reduced-motion: reduce` for scroll; focus move always happens).
- No props; self-contained.

**`BookingForm.jsx`**

- Props: `initialValues` (for restoring state on Back), `onSubmit(data)`.
- Local state per field; submit is async (Formspree POST).
- Validation runs on submit and on blur for the field just left.
- Submit button is disabled while in-flight; aria-busy on the form.
- Network failure: render a non-blocking error message inline above the submit button, keep state, allow resubmit.
- Phone input via `react-phone-number-input`; defaults to ZA (`+27`).

**`BookingEmbed.jsx`**

- Props: `formData`, `onBack()`.
- Local state: `mode` (`'coffee' | 'gametime'`), default `'coffee'`.
- Calls `getCalApi()` in `useEffect` once on mount; configures `ui()` with theme synced to `useTheme` (re-runs when theme changes).
- Renders `<Cal calLink={CAL_LINKS[mode]} config={{ name, email, notes, theme }} />`.
- Switching mode re-renders the `<Cal />` element so the embed reloads with the new link.

**`constants.js`**

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

### 4.3 Data flow

```
BookingForm  ──onSubmit(data)──►  Booking  ──formData──►  BookingEmbed  ──config──►  Cal.com
                                     │
                                     └──── (no global state; React state only)
```

No context, no Redux. State lives in `Booking.jsx` and dies with it.

## 5. Validation Rules

| Field      | Required | Rule                                                                        |
| ---------- | -------- | --------------------------------------------------------------------------- |
| Name       | ✅       | non-empty after trim, min 1 char                                            |
| Surname    | ✅       | non-empty after trim, min 1 char                                            |
| Email      | ✅       | matches `EMAIL_RE`                                                          |
| Phone      | ✅       | `isPossiblePhoneNumber(value)` from `react-phone-number-input` returns true |
| Occupation | ✅       | value is one of `OCCUPATIONS[*].value`                                      |
| Reason     | ❌       | optional; if provided, ≤ 1000 chars                                         |

Errors render below the field with `aria-describedby` pointing at the error element; the field gets `aria-invalid="true"`. The first invalid field receives focus on failed submit.

## 6. Formspree Integration

- **Endpoint**: stored in `VITE_FORMSPREE_ENDPOINT` env var (Vite reads `import.meta.env`).
- **Method**: `POST` with `Content-Type: application/json`, `Accept: application/json`.
- **Body**: `{ name, surname, email, phone, occupation, reason, _subject }` where `_subject` is set to `Portfolio booking enquiry — {name} {surname}` so the email arrives with a useful subject.
- **Honeypot field**: a hidden `_gotcha` input is included; Formspree drops submissions that fill it.
- **Failure handling**: any non-2xx response surfaces a single inline error; the user can retry. The advance-to-embed transition only happens on 2xx.
- **Env var setup**:
  - Local: `.env.local` with `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx`
  - Vercel: same key set in project env vars
  - `.env.local` added to `.gitignore` (verify; add if missing)
  - If the env var is missing at runtime, `console.warn` once on mount. The submit will then fail with the standard inline error — no special-case UI for misconfiguration.

## 7. Cal.com Embed

- Package: `@calcom/embed-react` (latest).
- Initialisation: `getCalApi()` then `cal('ui', { theme, styles: { branding: { brandColor: '#473bf0' } }, hideEventTypeDetails: false, layout: 'month_view' })`.
- Theme: subscribe to `useTheme`; when it changes, call `cal('ui', { theme })` again. The Cal embed accepts theme updates without remount.
- Prefill: pass `config={{ name: \`${name} ${surname}\`, email, notes: reason || '', theme }}`to`<Cal />`.
- The occupation field is **not** sent to Cal as a prefill (Cal embed `config` only exposes the public booking-question fields, not arbitrary metadata for unauthenticated embeds). Occupation is captured by Formspree and is therefore in the lead-capture email; if you later want it visible on the Cal.com booking, add it as a Cal.com booking question and we map it.
- Switching `mode` swaps `calLink`. React's key-based reconciliation handles the reload.

## 8. Styling

- Use existing tokens from `src/styles/tokens.css`. **No new colour values.** Stick to `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-primary`, `--color-secondary`, `--color-text`, `--color-text-muted`, `--radius-md`, `--shadow-sm`, `--shadow-md`, `--motion-fast`, `--motion-base`.
- Form layout: CSS Grid, two columns at ≥640px, single column below. Reuses the responsive pattern already in `Contact.module.css`.
- Mode selector: two buttons in a row at ≥480px, stacked below. Active mode uses `--color-primary` border + soft gradient background (matching the existing `.channelPrimary` style).
- Phone input library CSS: imported once in `BookingForm.jsx` (`'react-phone-number-input/style.css'`), then overridden inside `BookingForm.module.css` using `:global(.PhoneInputInput)` selectors to align with token-driven fields. **No inline styles.**
- Reduced motion: any non-essential transition (step fade, scroll-into-view) wrapped in `@media (prefers-reduced-motion: no-preference)`.

## 9. Accessibility

- Each input has a visible `<label>` linked via `htmlFor` / `id`.
- The form is a real `<form>` with `noValidate` so we own validation messages.
- `aria-invalid` and `aria-describedby` on invalid fields.
- The mode selector uses `role="tablist"` with each button as `role="tab"`; the Cal embed container is the implicit panel.
- After advancing to Step 2, focus moves to the active mode tab (announced as "Coffee chat tab, 1 of 2").
- "Back" is a real `<button type="button">`, not a link.
- Honeypot is `aria-hidden="true"` and `tabIndex={-1}`.
- All buttons meet 44×44px hit target (already a project standard per existing `.channel` rule).

## 10. Theme Awareness

- Existing `useTheme` returns `{ theme, toggle }` with `theme ∈ {'dark','light'}`.
- `BookingEmbed.jsx` reads `theme` and:
  - Passes `theme` to Cal's `ui()` call on mount.
  - Re-runs `cal('ui', { theme })` inside a `useEffect` that depends on `theme`.
  - Passes `theme` inside the `<Cal />` `config` prop so the booking iframe matches.
- Form components use token variables, so they re-theme automatically.

## 11. Dependencies to add

| Package                    | Why                                  | Approx size    |
| -------------------------- | ------------------------------------ | -------------- |
| `@calcom/embed-react`      | Cal.com embed                        | required       |
| `react-phone-number-input` | Country code + leading-zero handling | ~50 KB gzipped |

Both go into `dependencies` (runtime), not `devDependencies`.

## 12. Build & Quality Gates

Implementation passes when:

- `npm run lint` — zero warnings.
- `npm run format` — Prettier writes; `git diff` shows no formatting churn after.
- `npm run build` — zero warnings, build succeeds.
- Manual smoke at 320px, 768px, 1280px viewports.
- Manual smoke in dark and light themes.
- Manual submit happy-path: valid form → 2xx from Formspree → embed loads.
- Manual submit sad-path: bad email → inline error, no advance.
- Manual back-button: state preserved.
- Keyboard-only walkthrough: form → embed → back, all reachable without mouse.

## 13. Risks & Open Questions

| Item                                              | Resolution                                                                                                                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formspree endpoint not yet created                | User creates one before implementation; sets `VITE_FORMSPREE_ENDPOINT` in `.env.local` and Vercel.                                                                    |
| Cal.com booking questions for occupation/reason   | Out of scope for this iteration. Occupation lives in the Formspree email; reason is prefilled into Cal's notes.                                                       |
| `react-phone-number-input` CSS conflicts          | Mitigated by scoped `:global()` overrides inside the form's CSS module.                                                                                               |
| Embed CLS (layout shift on load)                  | Container reserves a fixed `min-height` before the iframe mounts: `640px` desktop, `720px` mobile (mobile Cal layout stacks vertically and runs taller than desktop). |
| Free-tier Formspree limits (50 submissions/month) | Acceptable for portfolio traffic; revisit if exceeded.                                                                                                                |

## 14. Non-Goals (explicit)

- We do not store form data in the browser (no localStorage). Refresh = lose state. Acceptable for a single-session flow.
- We do not send a confirmation email from our side — Cal.com handles booking confirmations; Formspree forwards the lead to the owner's inbox.
- We do not implement i18n for the form copy; English only.

## 15. Rollout

- Single PR.
- Implementation plan in a follow-up document via the `writing-plans` skill.
- No feature flag needed; the new section appears below existing contact channels and is purely additive.
