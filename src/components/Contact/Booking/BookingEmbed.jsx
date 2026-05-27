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

/**
 * Cal.com booking embed with a mode tab selector. Prefills name, email, and
 * notes from the form step and re-themes when the parent toggles dark/light.
 *
 * @param {{
 *   formData: { name: string, surname: string, email: string, phone: string, occupation: string, reason: string },
 *   onBack: () => void,
 * }} props
 */
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
