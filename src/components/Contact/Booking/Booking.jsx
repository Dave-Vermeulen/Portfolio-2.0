import { useRef, useState } from 'react';
import BookingForm from './BookingForm.jsx';
import BookingEmbed from './BookingEmbed.jsx';
import styles from './Booking.module.css';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Orchestrates the two-step booking flow: form first, then Cal.com embed
 * prefilled with the form data. Back button preserves form values via state.
 */
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
