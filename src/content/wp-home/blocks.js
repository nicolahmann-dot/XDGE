import video from './01-video.html?raw';
import strip from './02-strip.html?raw';
import call from './03-call.html?raw';
import hero from './04-hero.html?raw';
import what from './05-what.html?raw';
import who from './06-who.html?raw';
import bridge from './07-bridge.html?raw';
import programmes from './08-programmes.html?raw';
import experience from './09-experience.html?raw';
import method from './10-method.html?raw';
import outcomes from './11-outcomes.html?raw';
import reviews from './12-reviews.html?raw';
import questions from './13-questions.html?raw';
import next from './14-next.html?raw';
import footer from './15-footer.html?raw';

/**
 * WordPress homepage, in order.
 * Opening video stays static. Everything else rises Boldz-style on scroll.
 */
export const homeBlocks = [
  { id: 'video', html: video, theme: 'dark', reveal: false, label: 'Hero' },
  { id: 'strip', html: strip, theme: 'dark', reveal: true, label: 'Strip' },
  { id: 'call', html: call, theme: null, reveal: false, label: 'Discovery call' },
  { id: 'hero', html: hero, theme: 'light', reveal: true, label: 'Hero statement' },
  { id: 'what', html: what, theme: 'dark', reveal: true, label: 'What is XDGE' },
  { id: 'who', html: who, theme: 'light', reveal: true, label: 'Who it is for' },
  { id: 'bridge', html: bridge, theme: 'light', reveal: true, label: 'Experience bridge' },
  { id: 'programmes', html: programmes, theme: 'light', reveal: true, label: 'Choose your programme' },
  { id: 'experience', html: experience, theme: 'dark', reveal: true, label: 'The experience' },
  { id: 'method', html: method, theme: 'dark', reveal: true, label: 'How we develop leaders' },
  { id: 'outcomes', html: outcomes, theme: 'light', reveal: true, label: 'What you leave with' },
  { id: 'reviews', html: reviews, theme: 'light', reveal: true, label: 'Reviews' },
  { id: 'questions', html: questions, theme: 'light', reveal: true, label: 'Find your XDGE' },
  { id: 'next', html: next, theme: 'dark', reveal: true, label: 'Next step' },
  { id: 'footer', html: footer, theme: 'dark', reveal: true, label: 'Footer' },
];
