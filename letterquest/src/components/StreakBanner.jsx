import { motion, AnimatePresence } from 'framer-motion';
import PixelIcon from './PixelIcons';

// Shows streak messages with escalating visual effects
export default function StreakBanner({ streak }) {
  let message = null;
  let color = '';

  if (streak >= 10) {
    message = 'LEGENDARY!';
    color = 'from-yellow-400 via-red-500 to-purple-600';
  } else if (streak >= 5) {
    message = 'Amazing!';
    color = 'from-blue-400 to-purple-500';
  } else if (streak >= 3) {
    message = 'Super!';
    color = 'from-green-400 to-blue-500';
  }

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`absolute top-24 left-1/2 -translate-x-1/2 z-40
            bg-gradient-to-r ${color} text-white font-bubblegum
            px-8 py-3 rounded-full shadow-2xl flex items-center gap-2`}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{ fontSize: streak >= 10 ? 36 : streak >= 5 ? 30 : 24 }}
        >
          {streak >= 10 && <PixelIcon name="fire" size={32} />}
          {message}
          {streak >= 10 && <PixelIcon name="fire" size={32} />}
          {streak >= 5 && streak < 10 && <PixelIcon name="sparkle" size={24} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
