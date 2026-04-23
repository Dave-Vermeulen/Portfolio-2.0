import { SiMacos, SiPostman, SiSlack, SiVercel } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import styles from './About.module.css';

const TOOLS = [
  { Icon: SiMacos, label: 'macOS' },
  { Icon: VscVscode, label: 'VS Code' },
  { Icon: SiPostman, label: 'Postman' },
  { Icon: SiSlack, label: 'Slack' },
  { Icon: SiVercel, label: 'Vercel' },
];

export default function Toolstack() {
  return (
    <ul className={styles.iconGrid}>
      {TOOLS.map(({ Icon, label }) => (
        <li key={label} className={styles.iconCard} title={label} aria-label={label}>
          <Icon aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
