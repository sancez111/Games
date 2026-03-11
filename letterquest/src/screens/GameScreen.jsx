import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { WORLDS, LETTERS_PER_LEVEL, checkAnswer, generateLevelLetters } from '../data/worlds';
import { useGame } from '../context/GameContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { useTimer } from '../hooks/useTimer';
import TimerRing from '../components/TimerRing';
import Mascot from '../components/Mascot';
import Confetti from '../components/Confetti';
import StreakBanner from '../components/StreakBanner';
import WorldBackground from '../components/WorldBackground';
import Button from '../components/Button';
import PixelIcon from '../components/PixelIcons';
import { soundManager } from '../utils/soundManager';

export default function GameScreen() {
  const { worldId, levelIndex } = useParams();
  const wId = parseInt(worldId);
  const lIdx = parseInt(levelIndex);
  const world = WORLDS[wId - 1];
  const navigate = useNavigate();
  const { dispatch } = useGame();

  // Game state
  const [letters, setLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | 'expired'
  const [mascotMood, setMascotMood] = useState('idle');
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const feedbackTimeout = useRef(null);

  // Initialize level
  useEffect(() => {
    const levelLetters = generateLevelLetters(wId, lIdx);
    setLetters(levelLetters);

    // 3-2-1 countdown before starting
    const timer = setTimeout(() => {
      setShowCountdown(false);
      setGameActive(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [wId, lIdx]);

  const currentLetter = letters[currentIndex];

  // Move to next letter or finish
  const advanceToNext = useCallback(() => {
    if (currentIndex + 1 >= LETTERS_PER_LEVEL) {
      // Level complete
      setGameActive(false);
      const finalCorrect = correct;
      const finalScore = score;

      // Navigate to results after a short delay
      setTimeout(() => {
        navigate(`/complete/${wId}/${lIdx}`, {
          state: {
            correct: finalCorrect,
            score: finalScore,
            total: LETTERS_PER_LEVEL,
          },
        });
      }, 800);
    } else {
      // Next letter after pause
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setFeedback(null);
        setMascotMood('idle');
        timerControls.start();
      }, 1200);
    }
  }, [currentIndex, correct, score, wId, lIdx, navigate]);

  // Handle timer expire
  const handleTimerExpire = useCallback(() => {
    if (!gameActive) return;
    setFeedback('expired');
    setMascotMood('encourage');
    setStreak(0);
    soundManager.playWrong();
    advanceToNext();
  }, [gameActive, advanceToNext]);

  const timerControls = useTimer(world?.timer || 10, handleTimerExpire, gameActive);

  // Start timer when game becomes active
  useEffect(() => {
    if (gameActive && letters.length > 0) {
      timerControls.start();
    }
  }, [gameActive]);

  // Handle key press
  const handleKeyPress = useCallback(
    (key) => {
      if (!gameActive || feedback) return;

      timerControls.reset();

      if (checkAnswer(key, currentLetter, wId)) {
        // Correct!
        const newStreak = streak + 1;
        const points = 10;

        setFeedback('correct');
        setCorrect((prev) => prev + 1);
        setScore((prev) => prev + points);
        setStreak(newStreak);
        setMascotMood('happy');
        setShowConfetti(true);
        soundManager.playCorrect();

        if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
          soundManager.playStreak(newStreak);
        }

        setTimeout(() => setShowConfetti(false), 500);
        advanceToNext();
      } else {
        // Wrong
        setFeedback('wrong');
        setMascotMood('encourage');
        setStreak(0);
        soundManager.playWrong();

        // Let them try again after feedback clears
        setTimeout(() => {
          setFeedback(null);
          setMascotMood('idle');
          timerControls.start();
        }, 800);
      }
    },
    [gameActive, feedback, currentLetter, wId, streak, advanceToNext, timerControls]
  );

  useKeyboard(handleKeyPress, gameActive && !feedback);

  // Timer tick sound for last 3 seconds
  useEffect(() => {
    if (gameActive && timerControls.timeLeft <= 3 && timerControls.timeLeft > 0) {
      const rounded = Math.ceil(timerControls.timeLeft);
      if (Math.abs(timerControls.timeLeft - rounded) < 0.06) {
        soundManager.playTick();
      }
    }
  }, [timerControls.timeLeft, gameActive]);

  if (!world) {
    navigate('/worlds');
    return null;
  }

  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden">
      <WorldBackground theme={world.theme} />
      <Confetti active={showConfetti} type="stars" />
      <StreakBanner streak={streak} />

      {/* Top bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 pt-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/world/${wId}`)}>
          ✕
        </Button>
        <div className="flex items-center gap-4 text-white font-fredoka">
          <span className="text-lg flex items-center gap-1">
            <PixelIcon name="star" size={20} /> {score}
          </span>
          <span className="text-lg opacity-70">
            {currentIndex + 1}/{LETTERS_PER_LEVEL}
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* Game area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6">
        {showCountdown ? (
          <motion.div
            className="font-bubblegum text-8xl text-white drop-shadow-lg"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key="countdown"
          >
            Ready?
          </motion.div>
        ) : (
          <>
            {/* Timer */}
            <TimerRing
              progress={timerControls.progress}
              timeLeft={timerControls.timeLeft}
              size={100}
            />

            {/* Letter display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${currentLetter}`}
                className={`
                  w-64 h-64 rounded-3xl flex items-center justify-center
                  bg-white/90 shadow-2xl backdrop-blur-sm
                  ${feedback === 'correct' ? 'ring-8 ring-green-400' : ''}
                  ${feedback === 'wrong' ? 'ring-8 ring-red-300' : ''}
                `}
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  x: feedback === 'wrong' ? [0, -10, 10, -10, 10, 0] : 0,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  x: { duration: 0.4 },
                }}
              >
                <span
                  className="font-bubblegum select-none"
                  style={{
                    fontSize: '12rem',
                    lineHeight: 1,
                    color: feedback === 'correct'
                      ? '#4caf50'
                      : feedback === 'wrong'
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
                  className="font-fredoka text-2xl text-white drop-shadow font-semibold flex items-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Great job! <PixelIcon name="star" size={24} />
                </motion.p>
              )}
              {feedback === 'wrong' && (
                <motion.p
                  className="font-fredoka text-2xl text-white drop-shadow flex items-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Try again! You can do it! <PixelIcon name="flex" size={24} />
                </motion.p>
              )}
              {feedback === 'expired' && (
                <motion.p
                  className="font-fredoka text-2xl text-white drop-shadow flex items-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Let's try the next one! <PixelIcon name="sparkle" size={24} />
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Mascot */}
      <div className="absolute bottom-6 right-6 z-20">
        <Mascot mood={mascotMood} size={60} />
      </div>

      {/* Streak display */}
      {streak > 0 && (
        <motion.div
          className="absolute bottom-6 left-6 z-20 font-fredoka text-white drop-shadow text-lg flex items-center gap-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <PixelIcon name="fire" size={20} /> {streak} streak
        </motion.div>
      )}
    </div>
  );
}
