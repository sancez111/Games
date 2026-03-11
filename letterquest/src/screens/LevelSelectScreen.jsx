import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { WORLDS, LEVELS_PER_WORLD } from '../data/worlds';
import { useGame } from '../context/GameContext';
import Button from '../components/Button';
import Medal from '../components/Medal';
import WorldBackground from '../components/WorldBackground';
import PixelIcon from '../components/PixelIcons';

export default function LevelSelectScreen() {
  const { worldId } = useParams();
  const wId = parseInt(worldId);
  const world = WORLDS[wId - 1];
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const worldLevels = state.unlockedLevels[wId] || [];

  const handleLevelSelect = (levelIndex) => {
    if (!worldLevels.includes(levelIndex)) return;
    dispatch({ type: 'SET_CURRENT', payload: { world: wId, level: levelIndex } });
    navigate(`/play/${wId}/${levelIndex}`);
  };

  if (!world) {
    navigate('/worlds');
    return null;
  }

  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden">
      <WorldBackground theme={world.theme} />

      {/* Header */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-between px-6 pt-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/worlds')}>
          ← Back
        </Button>
        <h2 className="font-bubblegum text-3xl text-white drop-shadow flex items-center gap-2">
          <PixelIcon name={world.icon} size={36} /> {world.name}
        </h2>
        <div className="w-20" />
      </motion.div>

      {/* Level grid */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="grid grid-cols-5 gap-5">
          {Array.from({ length: LEVELS_PER_WORLD }, (_, i) => i + 1).map((levelIndex) => {
            const isUnlocked = worldLevels.includes(levelIndex);
            const medalKey = `${wId}-${levelIndex}`;
            const medal = state.medals[medalKey];

            return (
              <motion.button
                key={levelIndex}
                className={`
                  w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1
                  font-fredoka font-bold text-2xl transition-all cursor-pointer select-none
                  ${isUnlocked
                    ? 'bg-white/90 shadow-lg hover:shadow-xl text-gray-800'
                    : 'bg-white/30 text-gray-400 cursor-not-allowed'}
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: levelIndex * 0.08, type: 'spring' }}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => handleLevelSelect(levelIndex)}
              >
                {isUnlocked ? (
                  <>
                    <span>{levelIndex}</span>
                    <Medal type={medal} size={28} />
                  </>
                ) : (
                  <PixelIcon name="lock" size={36} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* World trophy */}
      {state.trophies.includes(wId) && (
        <motion.div
          className="relative z-10 pb-6 text-center flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <PixelIcon name="trophy" size={56} />
          <p className="font-fredoka text-white drop-shadow text-lg">World Complete!</p>
        </motion.div>
      )}
    </div>
  );
}
