import { motion } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { WORLDS, PASS_THRESHOLD, LETTERS_PER_LEVEL, LEVELS_PER_WORLD } from '../data/worlds';
import { useGame } from '../context/GameContext';
import Button from '../components/Button';
import Medal from '../components/Medal';
import Confetti from '../components/Confetti';
import { soundManager } from '../utils/soundManager';

export default function LevelCompleteScreen() {
  const { worldId, levelIndex } = useParams();
  const wId = parseInt(worldId);
  const lIdx = parseInt(levelIndex);
  const world = WORLDS[wId - 1];
  const navigate = useNavigate();
  const location = useLocation();
  const { state: gameState, dispatch } = useGame();

  const { correct = 0, score = 0, total = LETTERS_PER_LEVEL } = location.state || {};

  const passed = correct >= PASS_THRESHOLD;
  const accuracy = Math.round((correct / total) * 100);

  // Determine medal
  let medal = null;
  if (correct >= total) medal = 'gold';
  else if (correct >= 8) medal = 'silver';
  else if (correct >= PASS_THRESHOLD) medal = 'bronze';

  const [saved, setSaved] = useState(false);

  // Save results
  useEffect(() => {
    if (!saved && passed) {
      dispatch({
        type: 'COMPLETE_LEVEL',
        payload: { worldId: wId, levelIndex: lIdx, score, medal },
      });
      setSaved(true);
      soundManager.playLevelComplete();

      // Check if this completes the world
      const allLevels = Array.from({ length: LEVELS_PER_WORLD }, (_, i) => i + 1);
      const allComplete = allLevels.every(
        (l) => gameState.medals[`${wId}-${l}`] || l === lIdx
      );
      if (allComplete) {
        setTimeout(() => soundManager.playWorldComplete(), 1000);
      }
    }
  }, []);

  const isLastLevel = lIdx >= LEVELS_PER_WORLD;
  const hasNextWorld = wId < 5;

  const handleNext = () => {
    if (isLastLevel && hasNextWorld) {
      navigate(`/world/${wId + 1}`);
    } else if (isLastLevel) {
      navigate('/trophies');
    } else {
      navigate(`/play/${wId}/${lIdx + 1}`);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: passed
            ? 'linear-gradient(to bottom, #a5d6a7, #e8f5e9)'
            : 'linear-gradient(to bottom, #90caf9, #e3f2fd)',
        }}
      />
      <Confetti active={passed} type="confetti" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        {/* Title */}
        <motion.h2
          className="font-bubblegum text-4xl"
          style={{ color: world?.colors.primary || '#333' }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          {passed ? 'Level Complete!' : 'Nice Try!'}
        </motion.h2>

        {/* Emoji */}
        <motion.div
          className="text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {passed ? '🎉' : '💪'}
        </motion.div>

        {/* Medal */}
        {medal && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <Medal type={medal} size={80} animate />
          </motion.div>
        )}

        {/* Stats */}
        <div className="flex gap-8 mt-2 font-fredoka text-lg text-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: world?.colors.primary }}>
              {correct}/{total}
            </div>
            <div>Correct</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: world?.colors.primary }}>
              {accuracy}%
            </div>
            <div>Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: world?.colors.primary }}>
              ⭐ {score}
            </div>
            <div>Points</div>
          </div>
        </div>

        {!passed && (
          <p className="font-fredoka text-gray-500 text-center mt-2">
            You need {PASS_THRESHOLD} correct to pass.<br />
            Keep trying, you'll get it!
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate(`/play/${wId}/${lIdx}`)}
            className="!bg-gray-200 !text-gray-700"
          >
            🔄 Retry
          </Button>
          {passed ? (
            <Button variant="success" size="lg" onClick={handleNext}>
              {isLastLevel ? (hasNextWorld ? 'Next World ➜' : 'Trophies 🏆') : 'Next Level ➜'}
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate(`/world/${wId}`)}
            >
              Back to Levels
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
