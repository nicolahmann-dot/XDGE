/** Primary menu. External hrefs go to the WordPress pages. Home stays on this site. */
export const menuLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', href: 'https://xdgeleadership.com/about/' },
  { label: 'How It Works', href: 'https://xdgeleadership.com/how-it-works/' },
  { label: 'Programmes', href: 'https://xdgeleadership.com/programmes/' },
  { label: 'Apply', href: 'https://xdgeleadership.com/apply/', arrow: true },
  { label: 'Contact', href: 'https://xdgeleadership.com/contact-xdge/' },
  { label: 'Insights', href: 'https://xdgeleadership.com/xdge-insights/' },
];

export const programmesHref = 'https://xdgeleadership.com/programmes/';

export const programmeGroups = [
  {
    title: 'Career XDGE',
    href: 'https://xdgeleadership.com/career-xdge-programmes/',
    subtitle: 'Career Progression & Leadership',
    items: [
      {
        label: 'Career Accelerator',
        slug: 'career-accelerator',
        href: 'https://xdgeleadership.com/career-accelerator/',
        description: 'A Career XDGE pathway for career progression and leadership.',
      },
      {
        label: '1:1 Career Accelerator',
        slug: 'career-accelerator-1-1',
        href: 'https://xdgeleadership.com/121-career-accelerator/',
        description: 'The one-to-one Career XDGE pathway for career progression and leadership.',
      },
      {
        label: 'Professional to Leader',
        slug: 'professional-to-leader',
        href: 'https://xdgeleadership.com/professional-to-leader/',
        description: 'A Career XDGE pathway from professional to leader.',
      },
    ],
  },
  {
    title: 'University XDGE',
    href: 'https://xdgeleadership.com/university-xdge/',
    subtitle: 'Admissions & Graduate Readiness',
    items: [
      {
        label: 'University Standout',
        slug: 'university-standout',
        href: 'https://xdgeleadership.com/university-standout/',
        description: 'A University XDGE pathway for admissions and graduate readiness.',
      },
      {
        label: '1:1 University Standout',
        slug: 'university-standout-1-1',
        href: 'https://xdgeleadership.com/121university-standout/',
        description: 'The one-to-one University XDGE pathway for admissions and graduate readiness.',
      },
      {
        label: 'Student to Professional Accelerator',
        slug: 'student-to-professional',
        href: 'https://xdgeleadership.com/student-professional/',
        description: 'A University XDGE pathway from student to professional.',
      },
      {
        label: 'The Leader Endeavour – Summer 2027',
        slug: 'leader-endeavour-summer-2027',
        href: 'https://xdgeleadership.com/the-leadership-endeavour-summer-2027/',
        description: 'The Leader Endeavour, a University XDGE summer pathway for 2027.',
      },
    ],
  },
  {
    title: 'Early Leader XDGE',
    href: 'https://xdgeleadership.com/early-leader-xdge/',
    subtitle: 'Enrichment & Competitive Opportunities',
    items: [
      {
        label: 'After School & Weekend Academy',
        slug: 'after-school-weekend-academy',
        href: 'https://xdgeleadership.com/xdge-enrichment-academy/',
        description: 'An Early Leader XDGE academy for after-school and weekend enrichment.',
      },
      {
        label: '1:1 Student Standout',
        slug: 'student-standout-1-1',
        href: 'https://xdgeleadership.com/early-leader-standout/',
        description: 'The one-to-one Early Leader XDGE pathway for competitive opportunities.',
      },
      {
        label: 'Leadership & Business Camps',
        slug: 'leadership-business-camps',
        href: 'https://xdgeleadership.com/holiday-camps/',
        description: 'Early Leader XDGE camps in leadership and business.',
      },
      {
        label: 'Homeschool Leader & Business Academy',
        slug: 'homeschool-leadership-business-academy',
        href: 'https://xdgeleadership.com/homeschool-leader-business-academy/',
        description: 'An Early Leader XDGE academy in leadership and business for homeschooled students.',
      },
    ],
  },
];

export function programmePath(slug) {
  return `/programmes/${slug}`;
}

export function findProgramme(slug) {
  for (const group of programmeGroups) {
    const item = group.items.find((entry) => entry.slug === slug);
    if (item) {
      return {
        ...item,
        groupTitle: group.title,
        groupSubtitle: group.subtitle,
      };
    }
  }
  return null;
}

export const programmeRouteMeta = Object.fromEntries(
  programmeGroups.flatMap((group) =>
    group.items.map((item) => [
      programmePath(item.slug),
      {
        title: `${item.label} — XDGE`,
        description: item.description,
      },
    ]),
  ),
);
