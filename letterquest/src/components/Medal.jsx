import { motion } from 'framer-motion';
import PixelIcon from './PixelIcons';

const medalConfig = {
  gold: { icon: 'goldMedal', label: 'Gold' },
  silver: { icon: 'silverMedal', label: 'Silver' },
  bronze: { icon: 'bronzeMedal', label: 'Bronze' },
};

export default function Medal({ type, size = 48, animate = false }) {
  if (!type || !medalConfig[type]) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gray-200/50"
        style={{ width: size, height: size }}
      >
        <PixelIcon name="lock" size={size * 0.5} className="opacity-30" />
      </div>
    );
  }

  const config = medalConfig[type];

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={animate ? { scale: 0, rotate: -180 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <PixelIcon name={config.icon} size={size * 0.8} />
    </motion.div>
  );
}
