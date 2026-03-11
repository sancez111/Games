import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { soundManager } from '../utils/soundManager';
import Button from '../components/Button';
import PixelIcon from '../components/PixelIcons';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const holdTimer = useRef(null);
  const [holdProgress, setHoldProgress] = useState(0);

  const toggleSound = () => {
    const newVal = !state.settings.soundEnabled;
    dispatch({ type: 'UPDATE_SETTINGS', payload: { soundEnabled: newVal } });
    soundManager.setEnabled(newVal);
  };

  const toggleMusic = () => {
    const newVal = !state.settings.musicEnabled;
    dispatch({ type: 'UPDATE_SETTINGS', payload: { musicEnabled: newVal } });
    soundManager.setMusicEnabled(newVal);
  };

  // Hold-to-reveal reset (3 second hold gate for parent access)
  const startHold = () => {
    setHoldProgress(0);
    const start = Date.now();
    holdTimer.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const prog = Math.min(elapsed / 3000, 1);
      setHoldProgress(prog);
      if (prog >= 1) {
        clearInterval(holdTimer.current);
        setShowResetConfirm(true);
      }
    }, 50);
  };

  const endHold = () => {
    if (holdTimer.current) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
    setHoldProgress(0);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_PROGRESS' });
    setShowResetConfirm(false);
    navigate('/');
  };

  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-gray-100 to-slate-200" />

      {/* Header */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-between px-6 pt-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="!text-gray-700">
          ← Back
        </Button>
        <h2 className="font-bubblegum text-3xl text-gray-700 flex items-center gap-2">
          <PixelIcon name="gear" size={32} /> Settings
        </h2>
        <div className="w-20" />
      </motion.div>

      {/* Settings */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-md px-6">
        {/* Sound toggle */}
        <motion.div
          className="w-full bg-white rounded-2xl p-5 shadow-md flex items-center justify-between"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <PixelIcon name={state.settings.soundEnabled ? 'soundOn' : 'soundOff'} size={36} />
            <span className="font-fredoka text-xl text-gray-700">Sound Effects</span>
          </div>
          <button
            onClick={toggleSound}
            className={`
              w-16 h-9 rounded-full transition-colors cursor-pointer relative
              ${state.settings.soundEnabled ? 'bg-green-400' : 'bg-gray-300'}
            `}
          >
            <motion.div
              className="w-7 h-7 bg-white rounded-full shadow absolute top-1"
              animate={{ left: state.settings.soundEnabled ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </motion.div>

        {/* Music toggle */}
        <motion.div
          className="w-full bg-white rounded-2xl p-5 shadow-md flex items-center justify-between"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <PixelIcon name="musicNote" size={36} />
            <span className="font-fredoka text-xl text-gray-700">Music</span>
          </div>
          <button
            onClick={toggleMusic}
            className={`
              w-16 h-9 rounded-full transition-colors cursor-pointer relative
              ${state.settings.musicEnabled ? 'bg-green-400' : 'bg-gray-300'}
            `}
          >
            <motion.div
              className="w-7 h-7 bg-white rounded-full shadow absolute top-1"
              animate={{ left: state.settings.musicEnabled ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </motion.div>

        {/* Reset progress (parent-gated) */}
        <motion.div
          className="w-full bg-white rounded-2xl p-5 shadow-md"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-fredoka text-gray-500 text-sm mb-3 text-center">
            For parents: Hold button for 3 seconds
          </p>
          <div className="flex justify-center">
            <button
              className="relative px-6 py-3 bg-red-100 text-red-600 font-fredoka font-semibold rounded-xl cursor-pointer overflow-hidden select-none flex items-center gap-2"
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
            >
              {/* Progress bar */}
              <div
                className="absolute inset-0 bg-red-300/50 transition-all"
                style={{ width: `${holdProgress * 100}%` }}
              />
              <span className="relative flex items-center gap-2">
                <PixelIcon name="retry" size={20} /> Reset All Progress
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Reset confirmation dialog */}
      {showResetConfirm && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm mx-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            <h3 className="font-bubblegum text-2xl text-red-600 text-center mb-3">
              Reset Progress?
            </h3>
            <p className="font-fredoka text-gray-600 text-center mb-6">
              This will erase all medals, trophies, and points. This cannot be undone!
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setShowResetConfirm(false)}
                className="!bg-gray-200 !text-gray-700"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleReset}
                className="!bg-red-500 !from-red-500 !to-red-600"
              >
                Yes, Reset
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
