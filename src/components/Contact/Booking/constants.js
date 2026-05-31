export const CAL_LINKS = {
  coffee: 'dawud-vermeulen/letsgetcoffee',
  gametime: 'dawud-vermeulen/gametime',
};

export const OCCUPATIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'seeking', label: 'Seeking employment' },
  { value: 'student', label: 'Student' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'other', label: 'Other' },
];

export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
