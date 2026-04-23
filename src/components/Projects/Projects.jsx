import ProjectCard from './ProjectCards.jsx';
import notesApp from '../../Assets/Projects/notesApp.webp';
import lemonade from '../../Assets/Projects/lemonade.webp';
import justForToday from '../../Assets/Projects/justForToday.webp';
import QA_testing from '../../Assets/Projects/QA_testing.webp';
import gmail_inbox_cleaner from '../../Assets/Projects/gmail_inbox_cleaner.webp';
import prayerTimes from '../../Assets/Projects/prayerTimes.webp';
import OpenMosque from '../../Assets/Projects/OpenMosque.webp';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    img: prayerTimes,
    title: 'Islamic Prayer Times',
    description:
      "A sunset-coloured dashboard delivering accurate Islamic prayer times for Cape Town, South Africa — updated daily via the Aladhan API. Auto-refreshing times. Prophet's ﷺ dua with Arabic/English display. Pure Clojure: no dependencies, no problems.",
    ghLink: 'https://github.com/Dave-Vermeulen/Prayer-Times',
    demoLink: 'https://solaahtimes.vercel.app/',
  },
  {
    img: notesApp,
    title: 'Notes App',
    description:
      'A minimalistic notes app built using React and Tailwind CSS. CRUD operations on notes persisted via local storage.',
    ghLink: 'https://github.com/Dave-Vermeulen/Notes-App',
  },
  {
    img: justForToday,
    title: 'StepWork',
    description:
      'StepWork is a 12-Step inspired app for individuals from the rooms. We understand the challenges of managing step work, doing it bit by bit, and maintaining a healthy routine.',
    ghLink: 'https://github.com/Dave-Vermeulen/StepWork',
  },
  {
    img: lemonade,
    title: 'Normally 🍋',
    description:
      'A blog about my journey — demystifying the world of ADHD, Islam, and Tech. Built using the most enjoyable language, Clojure 🫶🏾',
    ghLink: 'https://github.com/Dave-Vermeulen/Lemonade',
    demoLink: 'https://equalsto.me/',
  },
  {
    img: QA_testing,
    title: "Noob's Guide to QA Testing",
    description:
      'A guide to learn quality assurance testing manually with TestRail and automation testing with Jest. Includes an Express.js server with API endpoints to test.',
    ghLink: 'https://github.com/Dave-Vermeulen/QA-Testing',
  },
  {
    img: gmail_inbox_cleaner,
    title: 'Chatbot',
    description:
      'A chatbot built with Python, FlaskAPI and the WhatsApp Business API. Responds to user messages with predefined answers and can be extended with more complex flows. v2 NLU with Dialogflow.',
    ghLink: 'https://gitlab.com/noortech/WhatsApp_Chatbot',
  },
  {
    img: OpenMosque,
    title: 'The Open Mosque',
    description:
      "WordPress site for the Mosque that has been inherited. We're in discussions with stakeholders to build a new site with a bit more bang!",
    demoLink: 'https://theopenmosque.org.za/',
  },
];

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          My Recent <strong className={styles.accent}>Works</strong>
        </h1>
        <p className={styles.intro}>Here are a few projects I&apos;ve worked on recently.</p>
        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
