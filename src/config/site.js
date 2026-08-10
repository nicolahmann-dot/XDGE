/**
 * Site-wide config — update social URLs & analytics ID when client provides details.
 * Leave social URLs as null to hide icons until ready.
 */
export const site = {
  name: 'XDGE',
  tagline: 'Leadership Development',
  domain: 'https://thexdge.com',
  email: 'info@thexdge.com',

  phones: {
    uk: { display: '0330 133 4470', tel: '+443301334470', label: 'UK' },
    usa: { display: '619 983 8853', tel: '+16199838853', label: 'USA' },
  },

  address: {
    line1: '71-75 Shelton Street',
    line2: 'Covent Garden',
    city: 'London',
    postcode: 'WC2H 9JQ',
    country: 'United Kingdom',
  },

  calendly: 'https://calendly.com/thexdge/strategy-session',

  social: {
    instagram: null,
    linkedin: null,
    facebook: null,
  },

  /** Set VITE_GA_ID in .env — e.g. G-XXXXXXXXXX */
  analyticsId: import.meta.env.VITE_GA_ID || null,
};

/** Social links with valid URLs only — empty array hides the block. */
export function getSocialLinks() {
  return Object.entries(site.social)
    .filter(([, href]) => href && href !== '#')
    .map(([key, href]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      key,
      href,
    }));
}

export const defaultMeta = {
  title: 'XDGE — Leadership Development',
  description: 'XDGE develops leadership capability, professional confidence, and real-world impact for school students, university applicants, graduates, and early-career professionals.',
  ogImage: '/assets/New Logo/Artboard 3.png',
};

export const routeMeta = {
  '/': {
    title: 'XDGE — Lead Your Own Opportunities',
    description: 'Leadership development programmes for school, university, and early-career professionals. Build confidence, capability, and impact that sets you apart.',
  },
  '/about': {
    title: 'About XDGE — The People Behind Your Progress',
    description: 'Meet the team, principles, and philosophy behind XDGE leadership development programmes.',
  },
  '/how-it-works': {
    title: 'How It Works — The XDGE Experience',
    description: 'Discover the journey, performance formula, and standards that define the XDGE leadership experience.',
  },
  '/programmes': {
    title: 'Programmes — School, University & Professional XDGE',
    description: 'Explore School, University, Professional, and Specialised XDGE programmes designed to build leadership from the inside out.',
  },
  '/performance-formula': {
    title: 'The Performance Formula — Capability Built Inside Out',
    description: 'Understand the XDGE performance formula that develops leadership mindset, skills, and real-world results.',
  },
  '/apply': {
    title: 'Apply — Ready to Build Your Edge?',
    description: 'Start your XDGE enquiry. Tell us about your goals and we will recommend the right leadership pathway.',
  },
  '/contact': {
    title: 'Contact XDGE — Let\'s Talk About Your Next Level',
    description: 'Get in touch or schedule a discovery meeting with the XDGE team.',
  },
  '/insights': {
    title: 'Insights — Leadership, Mindset & Performance',
    description: 'Latest perspectives on leadership development, early careers, and building lasting advantage.',
  },
  '/faq': {
    title: 'FAQ — Frequently Asked Questions',
    description: 'Answers to common questions about XDGE programmes, formats, and how to get started.',
  },
  '/privacy': {
    title: 'Privacy Policy — XDGE',
    description: 'How XDGE collects, uses, and protects your personal information.',
  },
  '/terms': {
    title: 'Terms of Use — XDGE',
    description: 'Terms and conditions for using the XDGE website and services.',
  },
};
