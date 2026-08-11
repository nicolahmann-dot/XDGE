import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { theme } from '../../theme';
import { mobileSrc } from '../../utils/mobileSrc';
import { SplitHeading } from '../primitives/SplitHeading';

const items = [
  { 
    id: '01', 
    title: "Business & Entrepreneurship", 
    desc: "Start a business, launch a product, develop a service, or solve a commercial challenge.",
    img: "/assets/1.webp" 
  },
  { 
    id: '02', 
    title: "Engineering, Design & Future Technologies", 
    desc: "Develop products, systems, prototypes, infrastructure, robotics, AI, and emerging technologies.",
    img: "/assets/4.webp" 
  },
  { 
    id: '03', 
    title: "Community Impact & Social Change", 
    desc: "Lead initiatives that improve communities, wellbeing, inclusion, or social outcomes.",
    img: "/assets/3.webp" 
  },
  { 
    id: '04', 
    title: "Media, Marketing & Creative Industries", 
    desc: "Lead projects in content creation, branding, journalism, film, design, communications, and digital media.",
    img: "/assets/7.webp" 
  },
  { 
    id: '05', 
    title: "Leadership, Sport & Human Performance", 
    desc: "Develop projects around coaching, team leadership, sport, performance psychology, and personal excellence.",
    img: "/assets/2.webp" 
  },
  { 
    id: '06', 
    title: "Law, Government & Public Affairs", 
    desc: "Explore policy, law, governance, diplomacy, public service, and societal challenges.",
    img: "/assets/5.webp" 
  },
  { 
    id: '07', 
    title: "Health, Medicine & Life Sciences", 
    desc: "Explore healthcare, medicine, psychology, sport science, biotechnology, and human performance.",
    img: "/assets/9.webp" 
  },
  { 
    id: '08', 
    title: "Culture, Fashion & Creative Enterprise", 
    desc: "Create ventures, campaigns, products, events, or initiatives within fashion, music, arts, culture, and entertainment.",
    img: "/assets/6.webp" 
  },
  { 
    id: '09', 
    title: "Research, Education & Knowledge Creation", 
    desc: "Conduct original research, investigations, publications, educational resources, or academic studies.",
    img: "/assets/8.webp" 
  },
  { 
    id: '10', 
    title: "Finance, Economics & Investment", 
    desc: "Explore markets, investment, economics, fintech, business finance, and financial decision-making.",
    img: "/assets/10.webp" 
  },
];

function Card({ item, index, progress, total }) {
  // Calculate difference from active center
  const diff = useTransform(progress, (p) => index - p);

  // Calculate layout on a circle
  const radius = 1200; // Radius of the wheel
  const anglePerItem = 14; // Degrees between each item

  const angle = useTransform(diff, (d) => d * anglePerItem);
  
  const x = useTransform(angle, (a) => radius * Math.sin((a * Math.PI) / 180));
  const y = useTransform(angle, (a) => radius - radius * Math.cos((a * Math.PI) / 180));
  const rotate = angle;
  
  const zIndex = useTransform(diff, (d) => total - Math.abs(Math.round(d)));
  
  // Fade out cards that are too far around the wheel
  const opacity = useTransform(diff, [-4, -3, 0, 3, 4], [0, 0.4, 1, 0.4, 0]);
  const scale = useTransform(diff, [-3, 0, 3], [0.8, 1, 0.8]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'clamp(240px, 25vw, 340px)',
        aspectRatio: '3/4',
        originX: 0.5,
        originY: 0.5,
        x: useTransform(x, (val) => `calc(-50% + ${val}px)`),
        y: useTransform(y, (val) => `calc(-50% + ${val}px)`),
        rotate,
        zIndex,
        opacity,
        scale,
      }}
    >
      <div style={{
        width: '100%', height: '100%',
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
        background: '#111',
      }}>
        <picture>
          {mobileSrc(item.img) && (
            <source media="(max-width: 768px)" srcSet={mobileSrc(item.img)} />
          )}
          <img
            src={item.img}
            alt={item.title}
            // Ten of these decode as the section arrives; async keeps that work off
            // the main thread so a decode can't land inside a scroll frame, and lazy
            // stops all ten competing during initial page load.
            decoding="async"
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: 0.8,
              transition: 'opacity 0.4s ease',
            }} 
            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
            onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
          />
        </picture>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 24, left: 24, right: 24,
          color: theme.base
        }}>
          <div style={{
            fontFamily: theme.display,
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1,
            opacity: 0.5,
            marginBottom: 8
          }}>
            {item.id}
          </div>
          <h3 style={{
            fontFamily: theme.displayTight,
            fontSize: 'clamp(18px, 2vw, 24px)',
            margin: 0,
            lineHeight: 1.1,
            marginBottom: item.desc ? 8 : 0
          }}>
            {item.title}
          </h3>
          {item.desc && (
            <p style={{
              margin: 0,
              fontSize: 'clamp(12px, 1.3vw, 14px)',
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.85)'
            }}>
              {item.desc}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function DragWheelCarousel() {
  const containerRef = useRef(null);

  // Any-pixel latch for the heading, matching SplitHeading's trigger geometry.
  const headingRef = useRef(null);
  const headingSeen = useInView(headingRef, { once: true });
  
  // Progress value (0 to items.length - 1)
  const progressRaw = useMotionValue(0);
  // Soft spring to make the transition smooth
  const progress = useSpring(progressRaw, { stiffness: 60, damping: 20, mass: 1 });

  // Handle Dragging / Swiping
  const handleDrag = (event, info) => {
    const delta = -info.delta.x / 200; // Adjust sensitivity
    let next = progressRaw.get() + delta;
    
    // Clamp to [0, items.length - 1]
    next = Math.max(0, Math.min(items.length - 1, next));
    progressRaw.set(next);
  };

  return (
    <section 
      data-screen-label="Drag Wheel Carousel"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 9vw, 120px) 0',
      }}
    >
      <div style={{ marginBottom: 60, position: 'relative', zIndex: 10, padding: '0 clamp(20px, 4vw, 40px)' }}>
        <SplitHeading
          lines={[
            <span className="xdge-how-will-stack">
              <span className="xdge-how-will-top-text">HOW WILL YOU </span>
              <span className="xdge-how-will-bottom">STAND OUT?</span>
            </span>,
          ]}
          lineClipClasses={['xdge-clip-tight-y xdge-how-will-clip']}
          style={{
            fontFamily: theme.displayCondensed,
            lineHeight: 0.75,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        />

        {/* Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
          <button
            onClick={() => {
              const next = Math.max(0, Math.round(progressRaw.get()) - 1);
              progressRaw.set(next);
            }}
            aria-label="Previous"
            style={{
              background: '#ffffff',
              border: 'none',
              color: '#000000',
              width: 56, height: 56, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => {
              const next = Math.min(items.length - 1, Math.round(progressRaw.get()) + 1);
              progressRaw.set(next);
            }}
            aria-label="Next"
            style={{
              background: '#ffffff',
              border: 'none',
              color: '#000000',
              width: 56, height: 56, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      {/* Drag Surface & Cards.
          Deliberately NOT wrapped in `data-reveal` any more. Fading the whole
          wheel in as one block meant animating `opacity` across a container
          holding 10 absolutely-positioned, rotated, scaled cards, each with a
          1600px image — which forces that entire subtree to be flattened into a
          single composited layer, and every one of those images to be decoded and
          uploaded for it. Measured scrolling this section in at 1600px/s: a 42ms
          compositor Commit and a 39ms image decode landing in one frame, worst
          frame 66.8ms (a 4-frame stall). Removing the block reveal took the worst
          frame to 17.8ms with zero dropped frames — an ablation with images
          hidden gave the same 17.7ms, confirming the cost was compositing those
          images together rather than anything about the cards themselves.
          The heading above still animates, so the section is not static. */}
      <div>
      {/* The drag surface owns its children's transforms every frame, so the CSS
          reveal engine must stay out of this subtree entirely. This used to be
          matched by sniffing for `cursor: grab` in the inline style; the marker
          is explicit now. */}
      <motion.div
        data-no-reveal
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // We handle the actual movement via progressRaw
        dragElastic={0}
        onDrag={handleDrag}
        style={{
          position: 'relative',
          height: 'clamp(400px, 60vh, 600px)',
          width: '100%',
          cursor: 'grab',
          // CRITICAL FIX: touchAction: 'pan-y' allows native vertical page scrolling 
          // while still allowing Framer Motion to intercept horizontal drags/swipes.
          touchAction: 'pan-y' 
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((item, i) => (
          <Card key={item.id} item={item} index={i} progress={progress} total={items.length} />
        ))}
      </motion.div>
      </div>
    </section>
  );
}
