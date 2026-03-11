import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import PixelIcon from './PixelIcons';

// Pixel art confetti/star burst animation
export default function Confetti({ active, type = 'stars' }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const items = type === 'confetti' ? 30 : 12;
    const icons = type === 'confetti'
      ? ['partyPopper', 'confettiSquare', 'sparkle', 'star', 'confettiCircle', 'confettiDiamond']
      : ['star', 'sparkle', 'star'];

    const newParticles = Array.from({ length: items }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 100 - 50,
      y: -(Math.random() * 200 + 50),
      rotate: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      delay: Math.random() * 0.3,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timer);
  }, [active, type]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: p.x * 4,
              y: p.y,
              scale: p.scale,
              opacity: 0,
              rotate: p.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              delay: p.delay,
              ease: 'easeOut',
            }}
          >
            <PixelIcon name={p.icon} size={Math.round(24 + p.scale * 12)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
