import styles from './About.module.css';

/**
 * @typedef {Object} TimelineEntry
 * @property {string} year
 * @property {string} title
 * @property {string} org
 * @property {string} description
 */

/** @type {TimelineEntry[]} */
const TIMELINE = [
  {
    year: 'Jan 2026 – now',
    title: 'Junior Software Developer',
    org: 'Tech Genius · Brackenfell',
    description:
      'Promoted from Software Tester after 7 months. Ship feature modules end-to-end on a production TypeScript Next.js app — tRPC routers, CouchDB/PouchDB queries, Zod schemas, React/MUI frontends, NextAuth role-based access. Turborepo, Docker, CI/CD alongside the senior team.',
  },
  {
    year: 'Jun 2025 – Jan 2026',
    title: 'Software Tester',
    org: 'Tech Genius · Brackenfell',
    description:
      'Joined as the first tester on a production agile team. Built the full QA function from zero: testing strategy, Playwright E2E automation, TestRail, Jira defect workflow. Picked up TypeScript & Playwright in the first month and delivered 60+ automated tests. Wrote a DB cleanup script that saved the dev team 2–3 hours a week.',
  },
  {
    year: '2025 – now',
    title: 'Co-Founder & CTO',
    org: 'GO2TECH Africa',
    description:
      'Co-founding a WhatsApp-first business automation platform for African SMEs. Leading all technical decisions — product architecture, technology stack, MVP development.',
  },
  {
    year: 'Sep 2024 – May 2025',
    title: 'Technical Consultant',
    org: "g0g0's X Roads",
    description:
      'Managed QA and customer experience for QuranBook.com from early dev through to launch. Runner-up at the 2024 Astron Energy Startup Pitch Competition. Delivered a full website build and digital transformation roadmap for Sureco Trading.',
  },
  {
    year: 'Apr 2024 – Jan 2025',
    title: 'ITP in Web Development',
    org: 'Code Your Future · London',
    description:
      'International training programme. JavaScript, Python, HTML, CSS, Git, Agile, Kanban — all delivered remotely from Cape Town through the London cohort.',
  },
  {
    year: 'Apr 2024 – Sep 2024',
    title: 'IT Support Specialist',
    org: 'Pixel Faerie · Cape Town',
    description:
      'Wrote a PowerShell script that took desktop cleanup from ~45 minutes to under 5. Supported a cloud migration and contributed to fault-tolerant infrastructure design. SQL queries for business reporting.',
  },
  {
    year: 'Nov 2023 – now',
    title: 'Director of Tech Ops & Youth Development (volunteer)',
    org: 'The Open Mosque · Wynberg',
    description:
      'Manage the full ICT portfolio — CCTV, network, DNS, website, basic SOC — with automated monitoring so problems surface and get handled without manual intervention. Run the Open Youth Programme: free daily coding classes for ages 6–25, plus HotDeskZA (workspace, Wi-Fi and a free meal, since Jan 2025).',
  },
  {
    year: 'Apr 2023 – Aug 2023',
    title: 'Prompt Engineer & Junior Full-Stack Developer',
    org: 'Medici Energy · Cape Town',
    description:
      'Automated bookkeeping workflows across 33 international entities using Python, NumPy and Excel VBA — cut manual data entry by ~70%. Built and deployed PHP modules for Magento 2 and contributed to the DevOps deployment pipeline.',
  },
  {
    year: 'Jun 2022 – Jan 2023',
    title: 'Java SE 8 OCA Certification',
    org: 'FreeThink Software Dev · Manpower Group ZA',
    description:
      'Java fundamentals, REST APIs, version control, Jira. Capstone: BlackoutAPI — a load-shedding tool that syncs Eskom schedules to Google Calendar.',
  },
];

export default function Timeline() {
  return (
    <div className={styles.timelineWrap}>
      <h2 className={styles.heading}>
        Career <strong className={styles.accent}>Timeline</strong>
      </h2>
      <ol className={styles.timeline}>
        {TIMELINE.map((entry) => (
          <li key={entry.year + entry.title} className={styles.timelineItem}>
            <div className={styles.timelineDot} aria-hidden="true" />
            <div className={styles.timelineBody}>
              <div className={styles.timelineYear}>{entry.year}</div>
              <div className={styles.timelineTitle}>{entry.title}</div>
              <div className={styles.timelineOrg}>{entry.org}</div>
              <p className={styles.timelineDescription}>{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
