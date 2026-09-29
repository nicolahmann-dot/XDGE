/** Primary menu. `end` keeps Home from matching every route. */
export const menuLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about', end: true },
  { label: 'How It Works', to: '/how-it-works', end: true },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Apply', to: '/apply', end: true, arrow: true },
  { label: 'Contact', to: '/contact', end: true },
  { label: 'Insights', to: '/insights' },
];

export const programmeGroups = [
  {
    title: 'Career XDGE',
    subtitle: 'Career Progression & Leadership',
    items: [
      {
        label: 'Career Accelerator',
        slug: 'career-accelerator',
        description: 'A Career XDGE pathway for career progression and leadership.',
      },
      {
        label: '1:1 Career Accelerator',
        slug: 'career-accelerator-1-1',
        description: 'The one-to-one Career XDGE pathway for career progression and leadership.',
      },
      {
        label: 'Emerging Leader Accelerator',
        slug: 'emerging-leader-accelerator',
        description: 'A Career XDGE pathway for emerging leaders.',
      },
    ],
  },
  {
    title: 'University XDGE',
    subtitle: 'Admissions & Graduate Readiness',
    items: [
      {
        label: 'University Admission Standout',
        slug: 'university-admission-standout',
        description: 'A University XDGE pathway for admissions and graduate readiness.',
      },
      {
        label: '1:1 University Admission Standout',
        slug: 'university-admission-standout-1-1',
        description: 'The one-to-one University XDGE pathway for admissions and graduate readiness.',
      },
      {
        label: 'Student Career Accelerator',
        slug: 'student-career-accelerator',
        description: 'A University XDGE pathway connecting students with career progression.',
      },
    ],
  },
  {
    title: 'School XDGE',
    subtitle: 'Enrichment & Competitive Opportunities',
    items: [
      {
        label: 'After School & Weekend Academy',
        slug: 'after-school-weekend-academy',
        description: 'A School XDGE academy for after-school and weekend enrichment.',
      },
      {
        label: '1:1 Student Standout',
        slug: 'student-standout-1-1',
        description: 'The one-to-one School XDGE pathway for competitive opportunities.',
      },
      {
        label: 'Homeschool Leadership & Business Academy',
        slug: 'homeschool-leadership-business-academy',
        description: 'A School XDGE academy in leadership and business for homeschooled students.',
      },
      {
        label: 'Leadership & Business Camps',
        slug: 'leadership-business-camps',
        description: 'School XDGE camps in leadership and business.',
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
