export const theme = {
  // Core palette — Cyan/Blue aesthetic
  dark: '#000000',
  base: '#FFFFFF',
  ink: '#000000',
  subtitle: '#A8A8A8',
  borderDark: '#1A1C20',
  borderLight: '#E5E5E5',

  // Accent system
  accent: '#20E3E8',          // cyan highlight
  accentWarm: '#1BCDF0',      // secondary cyan
  accentDeep: '#2146E8',      // deep royal blue
  midnight: '#000000',

  // Gradient tokens
  gradientAccent: 'linear-gradient(135deg, #20E3E8 0%, #1BCDF0 30%, #2484FF 70%, #2146E8 100%)',
  gradientWarm: 'linear-gradient(135deg, #1BCDF0 0%, #2484FF 100%)',
  gradientHero: '#050505',
  gradientMesh: '#050505',

  // Glow tokens
  glowAccent: '0 0 60px rgba(32, 227, 232, 0.25), 0 0 120px rgba(33, 70, 232, 0.15)',
  glowSoft: '0 20px 60px -20px rgba(5,5,5,0.8), 0 8px 24px -12px rgba(32, 227, 232, 0.15)',

  // Fonts
  display: "'Archivo Black', sans-serif",
  displayTight: "'Archivo Black', sans-serif",
  displayCondensed: "'Bebas Neue', sans-serif",
  subheading: "'Avenir', 'Avenir Next', 'Segoe UI', sans-serif",
  body: "'Inter', sans-serif",
  italic: "'Inter', sans-serif",
};

export const fadeUp = {
  // No scale — animating scale on cards re-rasterizes text/shadows and fights
  // hover transforms (the main jerk source). Opacity + one translateY only.
  // 48px travel so every text block visibly rises from the bottom on scroll.
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.12 } },
};

// Card grids: slower, more deliberate one-by-one cascade than the default
// text stagger — each card rises for ~1.1s and the next starts 0.28s later.
export const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.28, delayChildren: 0.15 } },
};

export const cardRise = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};
