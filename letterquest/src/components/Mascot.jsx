import { motion } from 'framer-motion';
import PixelIcon from './PixelIcons';

// Pixel art owl mascot that reacts to game events
export default function Mascot({ mood = 'idle', size = 80 }) {
  const moods = {
    idle: { icon: 'owl', animation: { y: [0, -5, 0] } },
    happy: { icon: 'owlHappy', animation: { y: [0, -15, 0], rotate: [0, -10, 10, 0] } },
    encourage: { icon: 'owl', animation: { rotate: [0, 5, -5, 5, 0] } },
    celebrate: { icon: 'partyPopper', animation: { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } },
  };

  const current = moods[mood] || moods.idle;

  return (
    <motion.div
      className="select-none"
      animate={current.animation}
      transition={{
        duration: mood === 'idle' ? 2 : 0.5,
        repeat: mood === 'idle' ? Infinity : 0,
        ease: 'easeInOut',
      }}
      key={mood}
    >
      <PixelIcon name={current.icon} size={size} />
    </motion.div>
  );
}
