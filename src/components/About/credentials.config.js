import { SiCredly } from 'react-icons/si';
import accredibleLogo from '../../Assets/accredible-logo.png';

export const CREDENTIALS = [
  {
    id: 'credly',
    platform: 'Credly',
    url: 'https://www.credly.com/users/dawud-vermeulen.3b0152c0',
    logo: { kind: 'icon', Component: SiCredly },
    blurb:
      'Verified badges from IBM, Google Cloud, AWS and Cisco — cloud, security, and design-thinking competencies.',
    cta: 'View my Credly wallet',
  },
  {
    id: 'accredible',
    platform: 'Accredible',
    url: 'https://www.credential.net/profile/dawdvermeulen506643/wallet',
    logo: { kind: 'image', src: accredibleLogo, alt: '' },
    blurb:
      'Industry-recognised certificates and digital credentials issued through the Accredible network.',
    cta: 'View my Accredible wallet',
  },
];
