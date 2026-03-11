import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useGame } from '../context/GameContext';
import { soundManager } from '../utils/soundManager';
import { useEffect } from 'react';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { state } = useGame();

  // Ensure sound manager settings are in sync
  useEffect(() => {
    soundManager.setEnabled(state.settings.soundEnabled);
    soundManager.setMusicEnabled(state.settings.musicEnabled);
  }, [state.settings]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-200 to-indigo-200" />

      {/* Floating decorations */}
      <motion.div
        className="absolute top-8 left-12 text-6xl select-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute top-16 right-16 text-5xl select-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-8 text-4xl select-none"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌻
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-12 text-5xl select-none"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        🌸
      </motion.div>

      {/* Title */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.h1
          className="font-bubblegum text-7xl md:text-8xl text-white drop-shadow-lg mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          LetterQuest
        </motion.h1>
        <p className="font-fredoka text-2xl text-white/80 drop-shadow mb-2">
          A Typing Adventure!
        </p>
        <motion.div
          className="text-5xl mb-8"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🦉
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <Button
          variant="primary"
          size="xl"
          icon="🎮"
          onClick={() => navigate('/worlds')}
        >
          PLAY
        </Button>

        <div className="flex gap-3 mt-2">
          <Button
            variant="secondary"
            size="md"
            icon="🏆"
            onClick={() => navigate('/trophies')}
          >
            Trophies
          </Button>
          <Button
            variant="ghost"
            size="md"
            icon="⚙️"
            onClick={() => navigate('/settings')}
          >
            Settings
          </Button>
        </div>

        {state.totalPoints > 0 && (
          <motion.div
            className="mt-4 text-white/70 font-fredoka text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⭐ {state.totalPoints} points
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
