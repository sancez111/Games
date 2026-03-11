import { motion } from 'framer-motion';
import { soundManager } from '../utils/soundManager';

// Kid-friendly button with large click targets
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  icon,
  disabled = false,
  className = '',
}) {
  const variants = {
    primary: 'bg-gradient-to-b from-yellow-400 to-orange-400 text-white shadow-lg shadow-orange-300/50 hover:from-yellow-300 hover:to-orange-300',
    secondary: 'bg-gradient-to-b from-blue-400 to-indigo-500 text-white shadow-lg shadow-indigo-300/50 hover:from-blue-300 hover:to-indigo-400',
    success: 'bg-gradient-to-b from-green-400 to-emerald-500 text-white shadow-lg shadow-green-300/50 hover:from-green-300 hover:to-emerald-400',
    ghost: 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm',
  };

  const sizes = {
    sm: 'px-4 py-2 text-base min-h-[40px] rounded-xl',
    md: 'px-6 py-3 text-lg min-h-[50px] rounded-2xl',
    lg: 'px-8 py-4 text-xl min-h-[60px] rounded-2xl',
    xl: 'px-10 py-5 text-2xl min-h-[70px] rounded-3xl',
  };

  const handleClick = (e) => {
    if (disabled) return;
    soundManager.playClick();
    onClick?.(e);
  };

  return (
    <motion.button
      className={`
        font-fredoka font-semibold inline-flex items-center justify-center gap-2
        transition-colors cursor-pointer select-none
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={handleClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
    >
      {icon && <span className="text-2xl flex items-center">{icon}</span>}
      {children}
    </motion.button>
  );
}
