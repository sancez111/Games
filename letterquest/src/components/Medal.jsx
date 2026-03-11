import { motion } from 'framer-motion';

const medalConfig = {
  gold: { emoji: '🥇', color: '#FFD700', label: 'Gold' },
  silver: { emoji: '🥈', color: '#C0C0C0', label: 'Silver' },
  bronze: { emoji: '🥉', color: '#CD7F32', label: 'Bronze' },
};

export default function Medal({ type, size = 48, animate = false }) {
  if (!type || !medalConfig[type]) {
    // Empty/locked slot
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gray-200/50"
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.5 }} className="opacity-30">🔒</span>
      </div>
    );
  }

  const config = medalConfig[type];

  return (
    <motion.div
      className="flex items-center justify-center"
      style={{ fontSize: size * 0.8 }}
      initial={animate ? { scale: 0, rotate: -180 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {config.emoji}
    </motion.div>
  );
}
