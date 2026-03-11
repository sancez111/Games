import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WORLDS } from '../data/worlds';
import { useGame } from '../context/GameContext';
import Button from '../components/Button';

export default function WorldMapScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const handleWorldSelect = (world) => {
    if (!state.unlockedWorlds.includes(world.id)) return;
    dispatch({ type: 'SET_CURRENT', payload: { world: world.id, level: state.currentLevel } });
    navigate(`/world/${world.id}`);
  };

  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-300 via-purple-200 to-pink-200" />

      {/* Header */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-between px-6 pt-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          ← Back
        </Button>
        <h2 className="font-bubblegum text-3xl text-white drop-shadow">
          Choose a World
        </h2>
        <div className="w-20" />
      </motion.div>

      {/* World path */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 py-6">
        {WORLDS.map((world, i) => {
          const isUnlocked = state.unlockedWorlds.includes(world.id);
          const hasTrophy = state.trophies.includes(world.id);

          return (
            <motion.button
              key={world.id}
              className={`
                flex items-center gap-4 px-8 py-4 rounded-2xl min-w-[320px]
                font-fredoka text-left transition-all cursor-pointer select-none
                ${isUnlocked
                  ? 'bg-white/90 shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-white/30 opacity-60 cursor-not-allowed'}
              `}
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={isUnlocked ? { scale: 1.05 } : {}}
              whileTap={isUnlocked ? { scale: 0.97 } : {}}
              onClick={() => handleWorldSelect(world)}
            >
              <span className="text-4xl">{isUnlocked ? world.icon : '🔒'}</span>
              <div className="flex-1">
                <div className="text-xl font-semibold" style={{ color: isUnlocked ? world.colors.primary : '#999' }}>
                  World {world.id}: {world.name}
                </div>
                <div className="text-sm text-gray-500">{world.description}</div>
              </div>
              {hasTrophy && <span className="text-3xl">🏆</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
