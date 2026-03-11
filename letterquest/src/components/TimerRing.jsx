import { motion } from 'framer-motion';

// Animated circular progress ring for the countdown timer
export default function TimerRing({ progress, timeLeft, size = 120 }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  // Color transitions: green -> yellow -> red
  const getColor = () => {
    if (progress > 0.6) return '#4caf50';
    if (progress > 0.3) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s' }}
        />
      </svg>
      {/* Time number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-fredoka font-bold text-white"
          style={{ fontSize: size * 0.3 }}
        >
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
}
