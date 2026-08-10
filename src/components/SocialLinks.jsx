import { motion } from 'framer-motion';
import { getSocialLinks } from '../config/site';
import { SocialIcon } from './SocialIcon';

export function SocialLinks({ theme: color = 'dark', justify = 'flex-start' }) {
  const links = getSocialLinks();
  if (!links.length) return null;

  const border = color === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.16)';
  const fg = color === 'light' ? '#000000' : '#ffffff';

  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: justify }}>
      {links.map((s) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          data-cursor="grow"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: `1px solid ${border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: fg,
            textDecoration: 'none',
          }}
        >
          <SocialIcon name={s.key} />
        </motion.a>
      ))}
    </div>
  );
}
