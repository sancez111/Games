import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { WORLDS, checkAnswer, generateLevelLetters, getLevelConfig, LETTERS_PER_LEVEL, PASS_THRESHOLD } from '../data/worlds';
import { useGame } from '../context/GameContext';
import { useTimer } from '../hooks/useTimer';
import TimerRing from '../components/TimerRing';
import Confetti from '../components/Confetti';
import StreakBanner from '../components/StreakBanner';
import WorldBackground from '../components/WorldBackground';
import BattleField from '../components/BattleField';
import Button from '../components/Button';
import PixelIcon from '../components/PixelIcons';
import { soundManager } from '../utils/soundManager';

let unitIdCounter = 0;

export default function GameScreen() {
  const { worldId, levelIndex } = useParams();
  const wId = parseInt(worldId);
  const lIdx = parseInt(levelIndex);
  const world = WORLDS[wId - 1];
  const levelConfig = getLevelConfig(wId, lIdx);
  const navigate = useNavigate();
  const { dispatch } = useGame();

  // Game state
  const [letters, setLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [gameResult, setGameResult] = useState(null); // 'win' | 'lose' | null

  // Refs for accurate values in callbacks
  const correctRef = useRef(0);
  const scoreRef = useRef(0);

  // Tower defense state
  const [playerHP, setPlayerHP] = useState(levelConfig?.playerHP || 5);
  const [enemyHP, setEnemyHP] = useState(levelConfig?.enemyHP || 3);
  const [units, setUnits] = useState([]);

  // Power-up state
  const [shieldActive, setShieldActive] = useState(false);
  const [slowActive, setSlowActive] = useState(false);
  const [fireballActive, setFireballActive] = useState(false);
  const [shieldCharges, setShieldCharges] = useState(1);
  const [slowCharges, setSlowCharges] = useState(levelConfig?.powerups.includes('slowTime') ? 1 : 0);
  const [fireballCharges, setFireballCharges] = useState(levelConfig?.powerups.includes('fireball') ? 1 : 0);
  const [selectedPowerup, setSelectedPowerup] = useState(null);
  const [powerupFlash, setPowerupFlash] = useState(null);

  // Track which powerups are available
  const availablePowerups = levelConfig?.powerups || ['shield'];

  // Initialize level
  useEffect(() => {
    if (!levelConfig) return;
    const levelLetters = generateLevelLetters(wId, lIdx);
    setLetters(levelLetters);
    correctRef.current = 0;
    scoreRef.current = 0;
    unitIdCounter = 0;

    const timer = setTimeout(() => {
      setShowCountdown(false);
      setGameActive(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [wId, lIdx]);

  const currentLetter = letters[currentIndex];

  // Spawn a unit marching across the field
  const spawnUnit = useCallback((side) => {
    const id = ++unitIdCounter;
    const startPos = side === 'player' ? 10 : 90;
    const endPos = side === 'player' ? 85 : 15;

    setUnits((prev) => [...prev, { id, side, position: startPos, lane: Math.floor(Math.random() * 2) }]);

    // Animate march and then remove
    setTimeout(() => {
      setUnits((prev) => prev.map((u) => u.id === id ? { ...u, position: endPos } : u));
    }, 50);

    setTimeout(() => {
      setUnits((prev) => prev.filter((u) => u.id !== id));
    }, 1200);
  }, []);

  // Check win/lose conditions
  const checkGameEnd = useCallback((newPlayerHP, newEnemyHP, newIndex) => {
    if (newEnemyHP <= 0) {
      setGameActive(false);
      setGameResult('win');
      soundManager.playLevelComplete();
      setTimeout(() => {
        navigate(`/complete/${wId}/${lIdx}`, {
          state: {
            correct: correctRef.current,
            score: scoreRef.current,
            total: letters.length || levelConfig?.waveSize || 5,
            won: true,
          },
        });
      }, 1500);
      return true;
    }
    if (newPlayerHP <= 0) {
      setGameActive(false);
      setGameResult('lose');
      soundManager.playWrong();
      setTimeout(() => {
        navigate(`/complete/${wId}/${lIdx}`, {
          state: {
            correct: correctRef.current,
            score: scoreRef.current,
            total: letters.length || levelConfig?.waveSize || 5,
            won: false,
          },
        });
      }, 1500);
      return true;
    }
    return false;
  }, [wId, lIdx, navigate, letters.length, levelConfig]);

  // Advance to next letter or finish
  const advanceToNext = useCallback(() => {
    if (currentIndex + 1 >= letters.length) {
      // All letters done — check if enemy castle is destroyed
      if (enemyHP > 0) {
        // Player didn't destroy enemy — win if enemy HP < 50%
        const enemyMaxHP = levelConfig?.enemyHP || 3;
        if (enemyHP <= enemyMaxHP / 2) {
          setGameActive(false);
          setGameResult('win');
          soundManager.playLevelComplete();
          setTimeout(() => {
            navigate(`/complete/${wId}/${lIdx}`, {
              state: {
                correct: correctRef.current,
                score: scoreRef.current,
                total: letters.length,
                won: true,
              },
            });
          }, 1500);
        } else {
          setGameActive(false);
          setGameResult('lose');
          setTimeout(() => {
            navigate(`/complete/${wId}/${lIdx}`, {
              state: {
                correct: correctRef.current,
                score: scoreRef.current,
                total: letters.length,
                won: false,
              },
            });
          }, 1500);
        }
      }
    } else {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setFeedback(null);
        setSlowActive(false);
        timerControls.start();
      }, 800);
    }
  }, [currentIndex, letters.length, enemyHP, wId, lIdx, navigate, levelConfig]);

  // Handle timer expire
  const handleTimerExpire = useCallback(() => {
    if (!gameActive) return;

    // Shield blocks the damage
    if (shieldActive) {
      setShieldActive(false);
      setPowerupFlash('shield');
      setTimeout(() => setPowerupFlash(null), 600);
      soundManager.playClick();
      advanceToNext();
      return;
    }

    // Enemy attacks!
    setFeedback('expired');
    spawnUnit('enemy');
    soundManager.playWrong();

    setPlayerHP((prev) => {
      const newHP = Math.max(0, prev - (levelConfig?.enemyAttack || 1));
      checkGameEnd(newHP, enemyHP, currentIndex);
      return newHP;
    });

    setStreak(0);
    advanceToNext();
  }, [gameActive, shieldActive, advanceToNext, spawnUnit, levelConfig, enemyHP, currentIndex, checkGameEnd]);

  const timerDuration = slowActive ? (levelConfig?.timer || 10) * 2 : (levelConfig?.timer || 10);
  const timerControls = useTimer(timerDuration, handleTimerExpire, gameActive);

  // Start timer when game becomes active
  useEffect(() => {
    if (gameActive && letters.length > 0) {
      timerControls.start();
    }
  }, [gameActive]);

  // Handle key press (letters + spacebar)
  const handleKeyDown = useCallback(
    (e) => {
      if (!gameActive || gameResult) return;

      // SPACEBAR = activate selected power-up
      if (e.key === ' ') {
        e.preventDefault();
        activatePowerup();
        return;
      }

      // Only accept letter keys
      if (!/^[a-zA-Z]$/.test(e.key)) return;
      if (feedback) return;

      e.preventDefault();
      timerControls.reset();

      if (checkAnswer(e.key, currentLetter, wId)) {
        // Correct — attack enemy castle!
        const newStreak = streak + 1;
        const points = 10 + (newStreak >= 3 ? 5 : 0);

        correctRef.current += 1;
        scoreRef.current += points;

        setFeedback('correct');
        setCorrect(correctRef.current);
        setScore(scoreRef.current);
        setStreak(newStreak);
        setShowConfetti(true);
        spawnUnit('player');
        soundManager.playCorrect();

        // Player attacks enemy castle
        setEnemyHP((prev) => {
          const newHP = Math.max(0, prev - (levelConfig?.playerAttack || 1));
          checkGameEnd(playerHP, newHP, currentIndex);
          return newHP;
        });

        // Recharge power-ups on streaks
        if (newStreak % 3 === 0) {
          rechargeRandomPowerup();
        }

        if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
          soundManager.playStreak(newStreak);
        }

        setTimeout(() => setShowConfetti(false), 500);
        advanceToNext();
      } else {
        // Wrong — shield check
        if (shieldActive) {
          setShieldActive(false);
          setPowerupFlash('shield');
          setTimeout(() => setPowerupFlash(null), 600);
          setFeedback(null);
          soundManager.playClick();
          timerControls.start();
          return;
        }

        // Enemy attacks
        setFeedback('wrong');
        spawnUnit('enemy');
        setStreak(0);
        soundManager.playWrong();

        setPlayerHP((prev) => {
          const newHP = Math.max(0, prev - (levelConfig?.enemyAttack || 1));
          checkGameEnd(newHP, enemyHP, currentIndex);
          return newHP;
        });

        setTimeout(() => {
          setFeedback(null);
          timerControls.start();
        }, 600);
      }
    },
    [gameActive, gameResult, feedback, currentLetter, wId, streak, advanceToNext, timerControls, shieldActive, spawnUnit, levelConfig, playerHP, enemyHP, currentIndex, checkGameEnd]
  );

  // Attach keydown listener
  useEffect(() => {
    if (!gameActive) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, gameActive]);

  // Power-up activation via spacebar
  const activatePowerup = useCallback(() => {
    if (!selectedPowerup || feedback) return;

    if (selectedPowerup === 'shield' && shieldCharges > 0) {
      setShieldCharges((prev) => prev - 1);
      setShieldActive(true);
      setPowerupFlash('shield');
      setTimeout(() => setPowerupFlash(null), 600);
      soundManager.playClick();
    } else if (selectedPowerup === 'slowTime' && slowCharges > 0) {
      setSlowCharges((prev) => prev - 1);
      setSlowActive(true);
      timerControls.start(); // restart with doubled time
      setPowerupFlash('slowTime');
      setTimeout(() => setPowerupFlash(null), 600);
      soundManager.playClick();
    } else if (selectedPowerup === 'fireball' && fireballCharges > 0) {
      setFireballCharges((prev) => prev - 1);
      setFireballActive(true);
      setPowerupFlash('fireball');
      setTimeout(() => setPowerupFlash(null), 600);
      soundManager.playCorrect();

      // Fireball damages enemy castle directly
      setTimeout(() => {
        setEnemyHP((prev) => {
          const newHP = Math.max(0, prev - (levelConfig?.fireballDamage || 2));
          checkGameEnd(playerHP, newHP, currentIndex);
          return newHP;
        });
        setFireballActive(false);
      }, 600);
    }
  }, [selectedPowerup, shieldCharges, slowCharges, fireballCharges, feedback, timerControls, levelConfig, playerHP, currentIndex, checkGameEnd]);

  // Recharge a random power-up
  const rechargeRandomPowerup = useCallback(() => {
    const options = [];
    if (shieldCharges < 3) options.push('shield');
    if (availablePowerups.includes('slowTime') && slowCharges < 3) options.push('slowTime');
    if (availablePowerups.includes('fireball') && fireballCharges < 3) options.push('fireball');
    if (options.length === 0) return;

    const choice = options[Math.floor(Math.random() * options.length)];
    if (choice === 'shield') setShieldCharges((prev) => Math.min(3, prev + 1));
    if (choice === 'slowTime') setSlowCharges((prev) => Math.min(3, prev + 1));
    if (choice === 'fireball') setFireballCharges((prev) => Math.min(3, prev + 1));
  }, [shieldCharges, slowCharges, fireballCharges, availablePowerups]);

  if (!world || !levelConfig) {
    navigate('/worlds');
    return null;
  }

  const powerupDefs = [
    { key: 'shield', name: 'Shield', icon: 'shield', color: '#AB47BC', charges: shieldCharges },
    ...(availablePowerups.includes('slowTime') ? [{ key: 'slowTime', name: 'Slow', icon: 'hourglass', color: '#42A5F5', charges: slowCharges }] : []),
    ...(availablePowerups.includes('fireball') ? [{ key: 'fireball', name: 'Fire', icon: 'fireball', color: '#FF9800', charges: fireballCharges }] : []),
  ];

  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden">
      <WorldBackground theme={world.theme} />
      <Confetti active={showConfetti} type="stars" />
      <StreakBanner streak={streak} />

      {/* Top bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-4 pt-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/world/${wId}`)}>
          ✕
        </Button>
        <div className="flex items-center gap-3 text-white font-fredoka">
          <span className="text-base flex items-center gap-1">
            <PixelIcon name="star" size={18} /> {score}
          </span>
          <span className="text-base opacity-70">
            {currentIndex + 1}/{letters.length}
          </span>
        </div>
        <div className="w-12" />
      </div>

      {/* Battlefield */}
      <div className="relative z-10 w-full px-4 mt-1">
        <div className="bg-gradient-to-b from-sky-600/40 to-emerald-800/40 rounded-xl border-2 border-white/20 overflow-hidden">
          <BattleField
            playerHP={playerHP}
            playerMaxHP={levelConfig.playerHP}
            enemyHP={enemyHP}
            enemyMaxHP={levelConfig.enemyHP}
            units={units}
            fireballActive={fireballActive}
            onFireballComplete={() => setFireballActive(false)}
            shieldActive={shieldActive}
            slowActive={slowActive}
          />
        </div>
      </div>

      {/* Game area — letter + timer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3">
        {showCountdown ? (
          <motion.div
            className="font-bubblegum text-7xl text-white drop-shadow-lg"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key="countdown"
          >
            Ready?
          </motion.div>
        ) : gameResult ? (
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <div className="font-bubblegum text-5xl text-white drop-shadow-lg mb-2">
              {gameResult === 'win' ? 'Victory!' : 'Defeated!'}
            </div>
            <PixelIcon
              name={gameResult === 'win' ? 'goldTrophy' : 'enemyCastle'}
              size={80}
            />
          </motion.div>
        ) : (
          <>
            {/* Timer */}
            <TimerRing
              progress={timerControls.progress}
              timeLeft={timerControls.timeLeft}
              size={70}
            />

            {/* Letter display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${currentLetter}`}
                className={`
                  w-40 h-40 rounded-2xl flex items-center justify-center
                  bg-white/90 shadow-2xl backdrop-blur-sm
                  ${feedback === 'correct' ? 'ring-6 ring-green-400' : ''}
                  ${feedback === 'wrong' || feedback === 'expired' ? 'ring-6 ring-red-300' : ''}
                `}
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  x: feedback === 'wrong' ? [0, -8, 8, -8, 8, 0] : 0,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  x: { duration: 0.3 },
                }}
              >
                <span
                  className="font-bubblegum select-none"
                  style={{
                    fontSize: '7rem',
                    lineHeight: 1,
                    color: feedback === 'correct'
                      ? '#4caf50'
                      : feedback === 'wrong' || feedback === 'expired'
                        ? '#ef5350'
                        : world.colors.primary,
                  }}
                >
                  {currentLetter}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Feedback text */}
            <AnimatePresence>
              {feedback === 'correct' && (
                <motion.p
                  className="font-fredoka text-lg text-white drop-shadow font-semibold flex items-center gap-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Attack! <PixelIcon name="playerSoldier" size={20} />
                </motion.p>
              )}
              {(feedback === 'wrong' || feedback === 'expired') && (
                <motion.p
                  className="font-fredoka text-lg text-white drop-shadow flex items-center gap-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Enemy attacks! <PixelIcon name="enemySoldier" size={20} />
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Power-up bar (bottom) */}
      {!showCountdown && !gameResult && (
        <div className="relative z-10 w-full px-4 pb-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between">
            {/* Power-up buttons */}
            <div className="flex gap-2">
              {powerupDefs.map((pu) => {
                const isSelected = selectedPowerup === pu.key;
                return (
                  <motion.button
                    key={pu.key}
                    className={`
                      relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl
                      cursor-pointer select-none transition-all min-w-[60px]
                      ${pu.charges > 0
                        ? isSelected
                          ? 'bg-white/90 shadow-lg ring-2 ring-yellow-400'
                          : 'bg-white/60 shadow hover:bg-white/80'
                        : 'bg-white/20 opacity-40 cursor-not-allowed'}
                    `}
                    whileTap={pu.charges > 0 ? { scale: 0.9 } : {}}
                    onClick={() => {
                      if (pu.charges > 0) {
                        setSelectedPowerup(isSelected ? null : pu.key);
                        soundManager.playClick();
                      }
                    }}
                    animate={powerupFlash === pu.key ? { scale: [1, 1.3, 1] } : {}}
                  >
                    <PixelIcon name={pu.icon} size={24} />
                    <span className="font-fredoka text-[10px] font-bold" style={{ color: pu.color }}>
                      {pu.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: i < pu.charges ? pu.color : '#666' }}
                        />
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Spacebar hint */}
            <div className="flex flex-col items-center">
              <motion.div
                className={`
                  px-4 py-1.5 rounded-lg font-fredoka text-sm font-bold
                  ${selectedPowerup ? 'bg-yellow-400 text-gray-800' : 'bg-white/20 text-white/50'}
                `}
                animate={selectedPowerup ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                SPACE
              </motion.div>
              <span className="font-fredoka text-[10px] text-white/60 mt-0.5">
                {selectedPowerup ? 'Press to use!' : 'Select a power'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Streak display */}
      {streak > 0 && !gameResult && (
        <motion.div
          className="absolute top-14 left-4 z-20 font-fredoka text-white drop-shadow text-sm flex items-center gap-1 bg-black/20 rounded-full px-2 py-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <PixelIcon name="fire" size={16} /> {streak}x
        </motion.div>
      )}
    </div>
  );
}
