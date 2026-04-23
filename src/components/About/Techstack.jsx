import { DiGoogleCloudPlatform, DiMongodb, DiNodejs, DiPython, DiReact } from 'react-icons/di';
import {
  SiApachecouchdb,
  SiDocker,
  SiDrizzle,
  SiJest,
  SiMui,
  SiNextdotjs,
  SiPostgresql,
  SiReacthookform,
  SiTrpc,
  SiTurborepo,
  SiTypescript,
  SiZod,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { TbTestPipe } from 'react-icons/tb';
import { GiBearFace } from 'react-icons/gi';
import { VscAzure } from 'react-icons/vsc';
import styles from './About.module.css';

const TIERS = [
  {
    label: 'Daily drivers at Tech Genius',
    items: [
      { Icon: SiTypescript, label: 'TypeScript' },
      { Icon: SiNextdotjs, label: 'Next.js' },
      { Icon: DiReact, label: 'React' },
      { Icon: SiTrpc, label: 'tRPC' },
      { Icon: SiZod, label: 'Zod' },
      { Icon: DiNodejs, label: 'Node.js' },
      { Icon: SiMui, label: 'MUI' },
      { Icon: SiReacthookform, label: 'React Hook Form' },
      { Icon: GiBearFace, label: 'Zustand' },
      { Icon: SiApachecouchdb, label: 'CouchDB' },
      { Icon: SiTurborepo, label: 'Turborepo' },
      { Icon: SiDocker, label: 'Docker' },
      { Icon: TbTestPipe, label: 'Playwright' },
    ],
  },
  {
    label: 'Personal stack (contract-first)',
    items: [
      { Icon: SiTypescript, label: 'TypeScript' },
      { Icon: SiPostgresql, label: 'PostgreSQL' },
      { Icon: SiDrizzle, label: 'Drizzle ORM' },
      { Icon: SiZod, label: 'Zod' },
      { Icon: DiReact, label: 'React' },
    ],
  },
  {
    label: 'Comfortable',
    items: [
      { Icon: DiPython, label: 'Python' },
      { Icon: SiJest, label: 'Jest' },
      { Icon: DiMongodb, label: 'MongoDB' },
      { Icon: DiGoogleCloudPlatform, label: 'Google Cloud' },
      { Icon: FaAws, label: 'AWS' },
      { Icon: VscAzure, label: 'Azure DevOps' },
    ],
  },
];

export default function Techstack() {
  return (
    <div className={styles.stackTiers}>
      {TIERS.map(({ label, items }) => (
        <div key={label} className={styles.stackTier}>
          <h3 className={styles.stackTierLabel}>{label}</h3>
          <ul className={styles.iconGrid}>
            {items.map(({ Icon, label: iconLabel }) => (
              <li
                key={iconLabel + label}
                className={styles.iconCard}
                title={iconLabel}
                aria-label={iconLabel}
              >
                <Icon aria-hidden="true" />
                <span className={styles.iconLabel}>{iconLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
