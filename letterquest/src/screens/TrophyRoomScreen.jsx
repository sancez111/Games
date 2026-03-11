import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WORLDS, LEVELS_PER_WORLD } from '../data/worlds';
import { useGame } from '../context/GameContext';
import Button from '../components/Button';
import Medal from '../components/Medal';

export default function TrophyRoomScreen() {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-yellow-100 to-orange-100" />

      {/* Header */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-between px-6 pt-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="!text-amber-800">
          ← Back
        </Button>
        <h2 className="font-bubblegum text-4xl text-amber-800 drop-shadow">
          🏆 Trophy Room
        </h2>
        <div className="w-20" />
      </motion.div>

      {/* Total points */}
      <motion.div
        className="relative z-10 mt-4 font-fredoka text-xl text-amber-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ⭐ Total Points: {state.totalPoints}
      </motion.div>

      {/* Trophies grid */}
      <div className="relative z-10 flex-1 w-full max-w-2xl px-6 py-6 overflow-y-auto">
        {WORLDS.map((world, wi) => (
          <motion.div
            key={world.id}
            className="mb-6 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: wi * 0.1 }}
          >
            {/* World header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{world.icon}</span>
              <h3
                className="font-fredoka text-xl font-semibold"
                style={{ color: world.colors.primary }}
              >
                {world.name}
              </h3>
              {state.trophies.includes(world.id) ? (
                <motion.span
                  className="text-3xl ml-auto"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆
                </motion.span>
              ) : (
                <span className="text-3xl ml-auto opacity-20">🏆</span>
              )}
            </div>

            {/* Level medals */}
            <div className="flex gap-3 justify-center">
              {Array.from({ length: LEVELS_PER_WORLD }, (_, i) => {
                const medalKey = `${world.id}-${i + 1}`;
                const medal = state.medals[medalKey];

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1"
                  >
                    <Medal type={medal} size={36} />
                    <span className="font-fredoka text-xs text-gray-500">
                      Lv.{i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
