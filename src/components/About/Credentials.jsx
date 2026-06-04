import { HiOutlineExternalLink } from 'react-icons/hi';
import { CREDENTIALS } from './credentials.config.js';
import styles from './Credentials.module.css';

function Logo({ logo }) {
  if (logo.kind === 'icon') {
    const Icon = logo.Component;
    return <Icon aria-hidden="true" />;
  }
  return <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />;
}

export default function Credentials() {
  return (
    <div className={styles.section}>
      <ul className={styles.grid}>
        {CREDENTIALS.map(({ id, platform, url, logo, blurb, cta }) => (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${platform} wallet — opens in a new tab`}
              className={styles.card}
            >
              <div className={styles.header}>
                <div className={styles.logoChip}>
                  <Logo logo={logo} />
                </div>
                <h3 className={styles.platform}>{platform}</h3>
              </div>
              <p className={styles.blurb}>{blurb}</p>
              <span className={styles.cta}>
                {cta}
                <HiOutlineExternalLink aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
