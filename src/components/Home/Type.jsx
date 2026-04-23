import Typewriter from 'typewriter-effect';

const STRINGS = [
  'Developer',
  'Entreprenerd',
  'MERN Stack Developer',
  'Open Source Contributor',
  'Father',
  'Husband',
  'Servant of God Almighty',
  'OOP is life',
  'Learner',
  'Teacher',
  'Mentor',
  'Freelancer',
];

export default function Type() {
  return (
    <Typewriter options={{ strings: STRINGS, autoStart: true, loop: true, deleteSpeed: 50 }} />
  );
}
