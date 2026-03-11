import { motion, AnimatePresence } from 'framer-motion';
import PixelIcon from './PixelIcons';

// Health bar component
function HealthBar({ current, max, side = 'player' }) {
  const pct = Math.max(0, current / max);
  const color = side === 'player' ? '#42A5F5' : '#EF5350';
  const bgColor = side === 'player' ? '#1565C0' : '#B71C1C';

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-20 h-3 rounded-full overflow-hidden border-2"
        style={{ borderColor: bgColor, background: '#263238' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="font-fredoka text-xs text-white drop-shadow font-bold">
        {current}/{max}
      </span>
    </div>
  );
}

// Marching unit on the battlefield
function Unit({ unit, fieldWidth }) {
  const isPlayer = unit.side === 'player';
  const xPos = (unit.position / 100) * (fieldWidth - 40);

  return (
    <motion.div
      className="absolute"
      style={{
        left: xPos,
        bottom: 8 + (unit.lane || 0) * 24,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, left: xPos }}
      exit={{ scale: 0, opacity: 0, y: -20 }}
      transition={{ duration: 0.3, left: { duration: 0.5, ease: 'easeOut' } }}
    >
      <PixelIcon
        name={isPlayer ? 'playerSoldier' : 'enemySoldier'}
        size={28}
        style={isPlayer ? {} : { transform: 'scaleX(-1)' }}
      />
    </motion.div>
  );
}

// Fireball projectile
function Fireball({ active, onComplete }) {
  if (!active) return null;

  return (
    <motion.div
      className="absolute z-30"
      style={{ bottom: 32 }}
      initial={{ left: '15%', scale: 0.5, opacity: 1 }}
      animate={{ left: '75%', scale: 1.2, opacity: 1 }}
      exit={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeIn' }}
      onAnimationComplete={onComplete}
    >
      <PixelIcon name="fireball" size={36} />
    </motion.div>
  );
}

// Main battlefield component
export default function BattleField({
  playerHP,
  playerMaxHP,
  enemyHP,
  enemyMaxHP,
  units = [],
  fireballActive = false,
  onFireballComplete,
  shieldActive = false,
  slowActive = false,
}) {
  return (
    <div className="w-full relative" style={{ height: 160 }}>
      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 rounded-b-lg"
        style={{
          background: 'linear-gradient(to bottom, #8D6E63, #6D4C41)',
          borderTop: '3px solid #A1887F',
        }}
      />

      {/* Grass patches */}
      <div className="absolute bottom-10 left-8 opacity-50">
        <PixelIcon name="leaf" size={12} />
      </div>
      <div className="absolute bottom-10 left-1/3 opacity-40">
        <PixelIcon name="leaf" size={10} />
      </div>
      <div className="absolute bottom-10 right-1/4 opacity-40">
        <PixelIcon name="leaf" size={11} />
      </div>

      {/* Player castle (left) */}
      <div className="absolute left-2 bottom-8 flex flex-col items-center gap-1">
        <HealthBar current={playerHP} max={playerMaxHP} side="player" />
        <motion.div
          animate={shieldActive ? {
            filter: ['drop-shadow(0 0 4px #42A5F5)', 'drop-shadow(0 0 8px #42A5F5)', 'drop-shadow(0 0 4px #42A5F5)'],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <PixelIcon name="playerCastle" size={56} />
        </motion.div>
        {shieldActive && (
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
            transition={{ rotate: { duration: 2, repeat: Infinity } }}
          >
            <PixelIcon name="shield" size={20} />
          </motion.div>
        )}
      </div>

      {/* Enemy castle (right) */}
      <div className="absolute right-2 bottom-8 flex flex-col items-center gap-1">
        <HealthBar current={enemyHP} max={enemyMaxHP} side="enemy" />
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <PixelIcon name="enemyCastle" size={56} />
        </motion.div>
      </div>

      {/* Battle lane (between castles) */}
      <div className="absolute left-20 right-20 bottom-0 h-16">
        <AnimatePresence>
          {units.map((unit) => (
            <Unit
              key={unit.id}
              unit={unit}
              fieldWidth={300}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Fireball */}
      <AnimatePresence>
        {fireballActive && (
          <Fireball active={fireballActive} onComplete={onFireballComplete} />
        )}
      </AnimatePresence>

      {/* Slow time visual indicator */}
      {slowActive && (
        <motion.div
          className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-blue-400/30 rounded-full px-3 py-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <PixelIcon name="hourglass" size={16} />
          <span className="font-fredoka text-xs text-blue-200 font-bold">SLOW</span>
        </motion.div>
      )}
    </div>
  );
}
