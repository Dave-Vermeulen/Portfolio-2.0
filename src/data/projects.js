import notesApp from '../Assets/Projects/notesApp.webp';
import lemonade from '../Assets/Projects/lemonade.webp';
import justForToday from '../Assets/Projects/justForToday.webp';
import QA_testing from '../Assets/Projects/QA_testing.webp';
import gmail_inbox_cleaner from '../Assets/Projects/gmail_inbox_cleaner.webp';
import prayerTimes from '../Assets/Projects/prayerTimes.webp';
import OpenMosque from '../Assets/Projects/OpenMosque.webp';

/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} img
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {string} [ghLink]
 * @property {string} [demoLink]
 * @property {boolean} [featured]
 */

/** @type {Project[]} */
export const PROJECTS = [
  {
    slug: 'prayer-times',
    img: prayerTimes,
    title: 'Islamic Prayer Times',
    description:
      'A sunset-coloured dashboard delivering accurate Islamic prayer times for Cape Town — updated daily via the Aladhan API. Auto-refreshing times, Prophet ﷺ dua with Arabic/English display, pure ClojureScript, no build steps, no drama.',
    tags: ['Clojure', 'ClojureScript', 'API'],
    ghLink: 'https://github.com/Dave-Vermeulen/Prayer-Times',
    demoLink: 'https://solaahtimes.vercel.app/',
    featured: true,
  },
  {
    slug: 'step-work',
    img: justForToday,
    title: 'StepWork',
    description:
      'A 12-Step inspired app for individuals from the rooms. Tracks step work progress bit by bit — designed around the real cadence of recovery and a healthy routine.',
    tags: ['Clojure', 'Recovery', 'Productivity'],
    ghLink: 'https://github.com/Dave-Vermeulen/Just_For_Today',
    featured: true,
  },
  {
    slug: 'normally-blog',
    img: lemonade,
    title: 'Normally 🍋',
    description:
      'My blog — "accounts of a human being\'s spiritual experience." Demystifying ADHD, Islam, and the joy of functional programming. Built in Clojure because it is the most enjoyable language 🫶🏾.',
    tags: ['Clojure', 'Blog', 'Writing'],
    ghLink: 'https://github.com/Dave-Vermeulen/Lemonade',
    demoLink: 'https://equalsto.me/',
    featured: true,
  },
  {
    slug: 'go-dope',
    img: justForToday,
    title: 'Go Dope',
    description:
      'A dopamine wellness journal — a Clojure side-project for tracking the small habits that move the needle on ADHD-adjacent focus. Built for an audience of one, maybe two.',
    tags: ['Clojure', 'Wellness', 'ADHD'],
    ghLink: 'https://github.com/Dave-Vermeulen/go-dope',
  },
  {
    slug: 'brag-diary',
    img: notesApp,
    title: 'Brag Diary',
    description:
      'A Python CLI for developers to log wins, shipped features, and notable PRs. Performance-review fuel — so you never stare at a blank doc in October.',
    tags: ['Python', 'CLI', 'Productivity'],
    ghLink: 'https://github.com/Dave-Vermeulen/Brag-Diary',
  },
  {
    slug: 'qa-testing',
    img: QA_testing,
    title: "Noob's Guide to QA Testing",
    description:
      'A practical guide to quality assurance — manual testing with TestRail and automation with Jest, against a small Express.js API. Written for folks coming into QA cold.',
    tags: ['Jest', 'Express', 'QA', 'Teaching'],
    ghLink: 'https://github.com/Dave-Vermeulen/QA-Testing',
  },
  {
    slug: 'notes-app',
    img: notesApp,
    title: 'Notes App',
    description:
      'iOS-style notes with CRUD operations, persisted in local storage. Built to nail React state + Tailwind fundamentals before moving on.',
    tags: ['React', 'Tailwind', 'localStorage'],
    ghLink: 'https://github.com/Dave-Vermeulen/Notes-App',
  },
  {
    slug: 'gmail-cleaner',
    img: gmail_inbox_cleaner,
    title: 'WhatsApp Chatbot',
    description:
      'A chatbot built with Python, Flask and the WhatsApp Business API. Responds to user messages with predefined flows; v2 adds NLU via Dialogflow.',
    tags: ['Python', 'Flask', 'WhatsApp API'],
    ghLink: 'https://gitlab.com/noortech/WhatsApp_Chatbot',
  },
  {
    slug: 'open-mosque',
    img: OpenMosque,
    title: 'The Open Mosque — Tech Ops & Youth Programme',
    description:
      'Director of Technical Operations (volunteer, Nov 2023 → now). Manage the full ICT portfolio — CCTV, network, DNS, website, basic SOC — with automated monitoring & failover. Also run the Open Youth Programme: free daily coding classes for ages 6–25, plus the HotDeskZA workspace + meal initiative.',
    tags: ['Community', 'Tech Ops', 'Teaching', 'Infrastructure'],
    demoLink: 'https://theopenmosque.org.za/',
    featured: true,
  },
];

export const ALL_TAGS = [...new Set(PROJECTS.flatMap((p) => p.tags))].sort();
