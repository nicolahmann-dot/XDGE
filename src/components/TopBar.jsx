import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { useScrollLock } from '../hooks/useScrollLock';
import { SocialLinks } from './SocialLinks';

const MotionLink = motion(Link);

const primaryLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Programmes', to: '/programmes' },
];

const secondaryLinks = [
  { label: 'Apply', to: '/apply' },
  { label: 'Contact', to: '/contact' },
  { label: 'Insights', to: '/insights' },
];

const overlayEase = [0.76, 0, 0.24, 1];
const fadeEase = [0.22, 1, 0.36, 1];

// Each link rises up from behind its clip; `custom` is the index so the whole
// menu cascades as one sequence after the panel has dropped in.
const linkVariants = {
  hidden: { y: '115%' },
  visible: (i = 0) => ({
    y: '0%',
    transition: { duration: 1.0, ease: fadeEase, delay: 0.4 + i * 0.09 },
  }),
};

// generic clip wrapper for a rising link
const clip = { display: 'block', overflow: 'hidden', paddingBottom: '0.06em' };

export function TopBar() {
  const [open, setOpen] = useState(false);
  // Closing via a nav link is not the same as closing via the burger. A link click
  // also changes route, and that work — unmounting the old page, fetching the lazy
  // chunk for the new one, resetting scroll, re-scanning for reveals — lands right
  // in the middle of the overlay's 1s slide-out. Measured: closing alone is a clean
  // 16.7ms median with zero dropped frames; closing WITH navigation produces a 67ms
  // frame, a ~4-frame hitch, and that is the stutter.
  //
  // The route render is real work and cannot be wished away, so the fix is to make
  // sure nothing is animating while it happens: a nav click drops the whole
  // AnimatePresence, so the overlay is gone in the same commit with no exit at all.
  // Shortening the exit duration was tried first and did nothing — AnimatePresence
  // animates an exiting child with the props it had before removal, so the new
  // duration was never read (overlay still left at ~606ms, not 300ms).
  const [navigating, setNavigating] = useState(false);
  const closeForNav = () => { setNavigating(true); setOpen(false); };
  const [sectionTheme, setSectionTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);

  // Locks the page behind the panel without the 8px scrollbar reflow — see the hook.
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect which section's bg is currently behind the header band, switch colors accordingly.
  // Using IntersectionObserver eliminates forced synchronous layout (layout thrashing) on scroll.
  const currentThemeRef = useRef(sectionTheme);
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-theme]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const current = entry.target.getAttribute('data-section-theme') || 'dark';
            if (current !== currentThemeRef.current) {
              currentThemeRef.current = current;
              setSectionTheme(current);
            }
          }
        });
      },
      {
        // Triggers when a section crosses the top 32px
        rootMargin: '-32px 0px -99% 0px'
      }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Hamburger adapts: black when open, otherwise dark on light / white on dark
  const fg = open ? '#000000' : (sectionTheme === 'light' ? theme.ink : theme.base);

  const barBase = {
    height: 2, display: 'block', background: fg,
    transformOrigin: 'center',
    transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
  };

  return (
    <>
      <motion.header data-no-reveal
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
          // Fixed boxes are laid out against the viewport, so when the lock reserves
          // the scrollbar's width this element would otherwise slide 8px right on its
          // own while everything else stayed put.
          paddingRight: 'var(--xg-lock-pad, 0px)',
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 40px)',
          gap: 16,
        }}>
          <button
            onClick={() => { setNavigating(false); setOpen((o) => !o); }}
            data-cursor="grow"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              // No backdrop-filter. This button is `position: fixed` over the hero
              // video, and a backdrop blur has to re-sample its backdrop on every
              // frame that backdrop paints — a looping video, so every frame — which
              // put the cost on each scroll frame in exactly the corner where the
              // stutter was reported. The disc is a flatter solid instead: raised
              // from 0.6/0.4 to 0.78/0.62 so it stays just as legible without it.
              background: scrolled && !open
                ? (sectionTheme === 'light' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.62)')
                : 'transparent',
              border: scrolled && !open
                ? (sectionTheme === 'light' ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.14)')
                : '1px solid transparent',
              borderRadius: 999,
              padding: 0,
              width: 60, height: 60,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 8,
              cursor: 'pointer',
              transition: 'background 0.45s var(--xg-ease), border-color 0.45s var(--xg-ease)',
            }}
          >
            <span
              style={{
                ...barBase,
                width: 34,
                transform: open
                  ? 'translate(0px, 5px) rotate(45deg)'
                  : 'translate(-4px, 0) rotate(0)',
              }}
            />
            <span
              style={{
                ...barBase,
                width: 28,
                transform: open
                  ? 'translate(0px, -5px) rotate(-45deg)'
                  : 'translate(5px, 0) rotate(0)',
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Dropped entirely on nav so there is no exit to stutter — see above. */}
      {!navigating && (
      <AnimatePresence>
        {open && (
          <motion.div key="menu-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.0, ease: overlayEase }}
            style={{
              position: 'fixed', inset: 0,
              background: '#ecede8', // Boldz-style neutral cream
              color: '#000000',
              zIndex: 1000,
              display: 'flex', flexDirection: 'column',
              padding: 'clamp(96px, 9vw, 112px) clamp(20px, 4vw, 48px) clamp(40px, 5vw, 56px)',
              overflowY: 'auto',
              // Keeps a scroll that bottoms out inside the menu from chaining to
              // the page behind it (previously handled by Lenis's prevent rule).
              overscrollBehavior: 'contain',
            }}
          >
            <div className="xg-menu-grid" style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', gap: 32,
              }}>
                <motion.div data-no-reveal
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: fadeEase } }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: theme.display, fontWeight: 900,
                      fontSize: 'clamp(16px, 2.2vw, 24px)', color: '#000000',
                      lineHeight: 1
                    }}>THE</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: theme.display, fontWeight: 900,
                        fontSize: 'clamp(48px, 6.5vw, 88px)', color: '#000000',
                        letterSpacing: '-0.02em', lineHeight: 0.755
                      }}>XDG</span>
                      <svg viewBox="0 0 100 100" style={{ height: 'clamp(32px, 4.5vw, 64px)', marginLeft: '6px', fill: '#000000' }}>
                        <rect y="15" width="100" height="15" />
                        <rect y="45" width="100" height="15" />
                        <rect y="75" width="100" height="15" />
                      </svg>
                    </div>
                    <div style={{
                      marginTop: 8,
                      fontFamily: theme.body,
                      fontSize: 'clamp(10px, 1.2vw, 14px)', letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      fontWeight: 600, color: '#000000',
                    }}>
                      LEAD YOUR OWN OPPORTUNITIES
                    </div>
                  </div>
                </motion.div>

                <motion.div data-no-reveal
                  className="xg-menu-image"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 1.0, delay: 0.55, ease: [0.22, 1, 0.36, 1] } }}
                  style={{
                    width: '100%', maxWidth: 480,
                    aspectRatio: '4/3', overflow: 'hidden',
                    background: '#000000',
                  }}
                >
                  <img
                    src="/assets/hero-presenter.jpg"
                    alt="XDGE in action"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </motion.div>
              </div>

              <nav
                style={{
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 'clamp(2px, 0.5vw, 6px)',
                }}
              >
                {primaryLinks.map((item, i) => (
                  <span key={item.label} style={clip}>
                    <MotionLink data-no-reveal
                      to={item.to}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={closeForNav}
                      data-cursor="grow"
                      whileHover={{ x: 16 }}
                      style={{
                        display: 'block',
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 'clamp(44px, 7vw, 87px)',
                        lineHeight: 1, letterSpacing: '0.01em',
                        color: '#000000', textDecoration: 'none',
                        textTransform: 'uppercase', fontWeight: 400,
                        whiteSpace: 'nowrap',
                        transition: 'color 0.3s var(--xg-ease)',
                      }}
                    >{item.label}</MotionLink>
                  </span>
                ))}
              </nav>

              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', gap: 32,
                textAlign: 'right',
              }}>
                <nav
                  style={{
                    display: 'flex', flexDirection: 'column',
                    gap: 'clamp(2px, 0.4vw, 4px)',
                  }}
                >
                  {secondaryLinks.map(({ label, to }, i) => {
                    const idx = i + primaryLinks.length;
                    const linkStyle = {
                      display: 'block',
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(22px, 3vw, 46px)',
                      lineHeight: 1.15, letterSpacing: '0.01em',
                      color: '#000000', textDecoration: 'none',
                      textTransform: 'uppercase', fontWeight: 400,
                    };
                    const shared = {
                      custom: idx,
                      variants: linkVariants,
                      initial: 'hidden',
                      animate: 'visible',
                      onClick: closeForNav,
                      'data-cursor': 'grow',
                      whileHover: { x: -10 },
                      style: linkStyle,
                    };
                    return (
                      <span key={label} style={clip}>
                        <MotionLink to={to} {...shared}>{label}</MotionLink>
                      </span>
                    );
                  })}
                </nav>

                <motion.div data-no-reveal
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.9, ease: fadeEase } }}
                >
                  <div style={{
                    fontSize: 11, letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: '#000000',
                    marginBottom: 12, fontWeight: 600,
                  }}>Follow Us</div>
                  <SocialLinks theme="light" justify="flex-end" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      )}
    </>
  );
}
