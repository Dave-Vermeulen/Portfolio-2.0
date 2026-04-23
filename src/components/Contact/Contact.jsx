import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FaIdCard, FaLinkedinIn } from 'react-icons/fa';
import { SiOrcid } from 'react-icons/si';
import styles from './Contact.module.css';

const EMAIL = 'vermeulend002@gmail.com';
const PHONE_DISPLAY = '+27 60 616 9909';
const PHONE_TEL = '+27606169909';

const CHANNELS = [
  {
    href: `mailto:${EMAIL}?subject=Hello%20Daw%C5%ABd`,
    label: 'Email',
    value: EMAIL,
    Icon: AiOutlineMail,
    primary: true,
  },
  {
    href: `tel:${PHONE_TEL}`,
    label: 'Phone / WhatsApp',
    value: PHONE_DISPLAY,
    Icon: AiOutlinePhone,
    primary: true,
  },
  {
    href: 'https://dawuds.place/',
    label: 'Digital business card',
    value: 'dawuds.place',
    Icon: FaIdCard,
  },
  {
    href: 'https://www.linkedin.com/in/dawud-vermeulen-99a94170/',
    label: 'LinkedIn',
    value: 'in/dawud-vermeulen',
    Icon: FaLinkedinIn,
  },
  {
    href: 'https://github.com/Dave-Vermeulen',
    label: 'GitHub',
    value: '@Dave-Vermeulen',
    Icon: AiFillGithub,
  },
  {
    href: 'https://x.com/davevermeul9',
    label: 'X (Twitter)',
    value: '@davevermeul9',
    Icon: AiOutlineTwitter,
  },
  {
    href: 'https://www.instagram.com/dave_his_slave/',
    label: 'Instagram',
    value: '@dave_his_slave',
    Icon: AiFillInstagram,
  },
  {
    href: 'https://orcid.org/0009-0009-4602-3543',
    label: 'ORCID',
    value: '0009-0009-4602-3543',
    Icon: SiOrcid,
  },
];

export default function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Let&apos;s <span className={styles.accent}>talk</span>
        </h1>
        <p className={styles.intro}>
          Open to mid-level developer roles at established companies — remote, hybrid, or on-site.
          Happy to chat about TypeScript, contract-first architecture, QA-to-dev pivots, or the
          youth coding programme I run in Wynberg. Email and WhatsApp are fastest; every other link
          lives at{' '}
          <a
            href="https://dawuds.place/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.accent}
          >
            dawuds.place
          </a>
          .
        </p>

        <div className={styles.channels}>
          {CHANNELS.map(({ href, label, value, Icon, primary }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
              rel={
                href.startsWith('mailto:') || href.startsWith('tel:')
                  ? undefined
                  : 'noopener noreferrer'
              }
              className={`${styles.channel} ${primary ? styles.channelPrimary : ''}`}
            >
              <Icon className={styles.channelIcon} aria-hidden="true" />
              <div>
                <div className={styles.channelLabel}>{label}</div>
                <div className={styles.channelValue}>{value}</div>
              </div>
            </a>
          ))}
        </div>

        <p className={styles.availability}>
          📍 Cape Town, South Africa &nbsp;•&nbsp; 🕑 UTC+2 &nbsp;•&nbsp; 💼 Remote / hybrid /
          on-site &nbsp;•&nbsp; 🌍 English, Afrikaans, Arabic
        </p>
        <p className={styles.availability}>References available on request.</p>
      </div>
    </section>
  );
}
