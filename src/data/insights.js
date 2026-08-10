export const insightPosts = [
  {
    slug: 'how-leadership-advances-early-careers',
    tag1: 'CAREER',
    tag2: 'UNIVERSITY',
    title: 'How Leadership Advances Early Careers',
    excerpt: 'The greater advantage is interviewing as a future leader, then transitioning into the workplace as someone employers already see as professionally credible, work-ready, able to lead from any seat, take ownership, and create impact from day one.',
    img: '/assets/ALL NEW IMAGES/9.webp',
    date: '2026-01-15',
    readTime: '4 min read',
    body: [
      'Early career success is rarely about knowing every answer on day one. It is about showing up with the mindset, presence, and initiative that signal you can grow, contribute, and lead before you have the title.',
      'XDGE helps graduates and early professionals develop exactly that edge: the confidence to communicate with clarity, the discipline to follow through, and the ability to lead projects that demonstrate real impact.',
      'When you interview as someone who has already led — even in a structured programme context — employers see more than a CV. They see evidence of how you think, how you work with others, and how you create results under pressure.',
      'That is the long-term advantage: not just landing the role, but performing strongly once you are in it, and being identified early for greater responsibility.',
    ],
  },
  {
    slug: 'what-top-universities-seek-in-emerging-leaders',
    tag1: 'UNIVERSITY',
    tag2: null,
    title: 'What Top Universities Seek In Emerging Leaders',
    excerpt: 'Competitive universities look for evidence of initiative, contribution, and real-world impact from students who can clearly communicate the difference they have made.',
    img: '/assets/ALL NEW IMAGES/5.webp',
    date: '2026-02-03',
    readTime: '3 min read',
    body: [
      'Strong grades open the door. What gets you through it is proof that you have done something meaningful with your abilities — initiative, contribution, and impact that goes beyond the classroom.',
      'Admissions teams at competitive universities are looking for candidates who can articulate what they stand for, what they have built, and why it matters. A leadership project gives you that narrative.',
      'XDGE helps students aged 16+ develop the skills and evidence universities actively seek: communication under pressure, real-world problem solving, and a portfolio of work that shows who you are becoming — not just what you have studied.',
      'The students who stand out are rarely the loudest. They are the ones who can point to something they led, changed, or created — and explain the difference it made.',
    ],
  },
  {
    slug: 'how-young-leadership-creates-lasting-advantage',
    tag1: 'SCHOOL',
    tag2: 'UNIVERSITY',
    title: 'How Young Leadership Creates Lasting Advantage',
    excerpt: 'Leadership is about developing conviction, building on your unique strengths, standing behind your beliefs and ambitions, and knowing how to translate them into action that creates your long-term advantage.',
    img: '/assets/ALL NEW IMAGES/ALL NEW IMAGES (4).webp',
    date: '2026-02-20',
    readTime: '5 min read',
    body: [
      'The habits formed in school years often shape decades of confidence, ambition, and self-belief. Leadership is not reserved for adults with job titles — it begins when a young person learns to take ownership, communicate clearly, and follow through on what matters to them.',
      'XDGE School programmes help students aged 11–18 build that foundation early: resilience, focus, teamwork, and the ability to lead a project that reflects their strengths and interests.',
      'When leadership is developed in formative years, the advantage compounds. Students enter applications, interviews, and new environments with a clarity and confidence that peers often lack — not because they are louder, but because they have practiced leading.',
      'How different might our lives have been if these foundations had been built in our formative years? That question drives everything we do at XDGE.',
    ],
  },
];

export function getInsightBySlug(slug) {
  return insightPosts.find((p) => p.slug === slug) ?? null;
}
