import { motion } from 'framer-motion';
import PixelIcon from './PixelIcons';

const trophyConfig = {
  gold: { icon: 'goldTrophy', label: 'Gold' },
  silver: { icon: 'silverTrophy', label: 'Silver' },
  bronze: { icon: 'bronzeTrophy', label: 'Bronze' },
};

export default function Medal({ type, size = 48, animate = false }) {
  if (!type || !trophyConfig[type]) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gray-200/50"
        style={{ width: size, height: size }}
      >
        <PixelIcon name="lock" size={size * 0.5} className="opacity-30" />
      </div>
    );
  }

  const config = trophyConfig[type];

  return (
    <motion.div
      className="flex items-center justify-center relative"
      initial={animate ? { scale: 0, rotate: -180 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {/* Shimmer animation for gold */}
      {type === 'gold' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <motion.div
        animate={type === 'gold' ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PixelIcon name={config.icon} size={size * 0.8} />
      </motion.div>
    </motion.div>
  );
}
