// Themed background decorations for each world
export default function WorldBackground({ theme }) {
  const backgrounds = {
    forest: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-green-300 via-emerald-200 to-lime-100" />
        <div className="absolute bottom-0 left-0 text-6xl opacity-40 select-none">🌳🌲🌳🌿🌲</div>
        <div className="absolute bottom-0 right-0 text-6xl opacity-40 select-none">🌲🌳🌿🌲🌳</div>
        <div className="absolute top-4 right-8 text-4xl opacity-30 select-none">🦋</div>
        <div className="absolute top-12 left-12 text-3xl opacity-30 select-none">🐦</div>
        <div className="absolute top-8 left-1/3 text-4xl opacity-20 select-none">☀️</div>
      </>
    ),
    ocean: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-300 via-sky-200 to-blue-100" />
        <div className="absolute bottom-0 left-0 text-5xl opacity-40 select-none">🌊🐚🌊🐠🌊</div>
        <div className="absolute bottom-0 right-0 text-5xl opacity-40 select-none">🌊🐡🌊🐚🌊</div>
        <div className="absolute top-16 right-12 text-4xl opacity-30 select-none">🐙</div>
        <div className="absolute top-20 left-16 text-3xl opacity-25 select-none">🫧</div>
        <div className="absolute top-8 right-1/3 text-4xl opacity-20 select-none">⛵</div>
      </>
    ),
    space: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-violet-300 to-fuchsia-200" />
        <div className="absolute top-4 left-8 text-3xl opacity-40 select-none">⭐</div>
        <div className="absolute top-16 right-16 text-2xl opacity-30 select-none">✨</div>
        <div className="absolute bottom-8 left-12 text-4xl opacity-35 select-none">🪐</div>
        <div className="absolute bottom-12 right-8 text-3xl opacity-30 select-none">🌙</div>
        <div className="absolute top-1/3 left-4 text-2xl opacity-25 select-none">🛸</div>
        <div className="absolute top-8 right-1/4 text-5xl opacity-20 select-none">🚀</div>
      </>
    ),
    dino: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-200 to-yellow-100" />
        <div className="absolute bottom-0 left-0 text-5xl opacity-40 select-none">🌴🦕🌴🌿🌴</div>
        <div className="absolute bottom-0 right-0 text-5xl opacity-40 select-none">🌴🦖🌴🌿🌴</div>
        <div className="absolute top-8 right-12 text-4xl opacity-25 select-none">🌋</div>
        <div className="absolute top-16 left-16 text-3xl opacity-30 select-none">🥚</div>
      </>
    ),
    rainbow: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-pink-300 via-rose-200 to-red-100" />
        <div className="absolute top-4 left-1/4 text-5xl opacity-30 select-none">🌈</div>
        <div className="absolute bottom-4 left-8 text-4xl opacity-35 select-none">🦄</div>
        <div className="absolute bottom-8 right-12 text-4xl opacity-30 select-none">🏰</div>
        <div className="absolute top-12 right-8 text-3xl opacity-25 select-none">👑</div>
        <div className="absolute top-1/2 left-4 text-3xl opacity-20 select-none">💎</div>
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {backgrounds[theme] || backgrounds.forest}
    </div>
  );
}
