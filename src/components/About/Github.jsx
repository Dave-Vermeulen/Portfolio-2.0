import GitHubCalendar from 'react-github-calendar';
import styles from './About.module.css';

export default function Github() {
  return (
    <div className={styles.github}>
      <h2 className={styles.heading}>
        Days I <strong className={styles.accent}>Code</strong>
      </h2>
      <GitHubCalendar
        username="Dave-Vermeulen"
        blockSize={15}
        blockMargin={5}
        colorScheme="dark"
        fontSize={16}
      />
    </div>
  );
}
