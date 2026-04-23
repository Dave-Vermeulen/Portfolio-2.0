import { CgCPlusPlus } from 'react-icons/cg';
import {
  DiGit,
  DiGoogleCloudPlatform,
  DiJava,
  DiJavascript1,
  DiMongodb,
  DiNodejs,
  DiPhp,
  DiPython,
  DiReact,
} from 'react-icons/di';
import { SiFirebase, SiNextdotjs, SiPostgresql, SiRedis, SiSolidity } from 'react-icons/si';
import { TbBrandGolang } from 'react-icons/tb';
import styles from './About.module.css';

const TECH = [
  { Icon: DiGoogleCloudPlatform, label: 'Google Cloud' },
  { Icon: DiJavascript1, label: 'JavaScript' },
  { Icon: DiPhp, label: 'PHP' },
  { Icon: DiNodejs, label: 'Node.js' },
  { Icon: DiReact, label: 'React' },
  { Icon: SiSolidity, label: 'Solidity' },
  { Icon: DiMongodb, label: 'MongoDB' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: DiGit, label: 'Git' },
  { Icon: SiFirebase, label: 'Firebase' },
  { Icon: SiRedis, label: 'Redis' },
  { Icon: SiPostgresql, label: 'PostgreSQL' },
  { Icon: DiPython, label: 'Python' },
  { Icon: DiJava, label: 'Java' },
  { Icon: TbBrandGolang, label: 'Go' },
  { Icon: CgCPlusPlus, label: 'C++' },
];

export default function Techstack() {
  return (
    <ul className={styles.iconGrid}>
      {TECH.map(({ Icon, label }) => (
        <li key={label} className={styles.iconCard} title={label} aria-label={label}>
          <Icon aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
