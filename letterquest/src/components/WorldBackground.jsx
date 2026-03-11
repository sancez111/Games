import PixelIcon from './PixelIcons';

// Themed background decorations for each world using pixel art
export default function WorldBackground({ theme }) {
  const backgrounds = {
    forest: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-green-300 via-emerald-200 to-lime-100" />
        <div className="absolute bottom-0 left-4 opacity-40 select-none flex gap-1 items-end">
          <PixelIcon name="tree" size={64} />
          <PixelIcon name="tree" size={48} />
          <PixelIcon name="leaf" size={40} />
          <PixelIcon name="tree" size={56} />
        </div>
        <div className="absolute bottom-0 right-4 opacity-40 select-none flex gap-1 items-end">
          <PixelIcon name="tree" size={56} />
          <PixelIcon name="leaf" size={40} />
          <PixelIcon name="tree" size={64} />
        </div>
        <div className="absolute top-4 right-8 opacity-30 select-none">
          <PixelIcon name="butterfly" size={48} />
        </div>
        <div className="absolute top-12 left-12 opacity-30 select-none">
          <PixelIcon name="bird" size={40} />
        </div>
        <div className="absolute top-8 left-1/3 opacity-20 select-none">
          <PixelIcon name="sun" size={56} />
        </div>
      </>
    ),
    ocean: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-300 via-sky-200 to-blue-100" />
        <div className="absolute bottom-0 left-4 opacity-40 select-none flex gap-2 items-end">
          <PixelIcon name="wave" size={56} />
          <PixelIcon name="seashell" size={40} />
          <PixelIcon name="wave" size={48} />
          <PixelIcon name="fish" size={44} />
        </div>
        <div className="absolute bottom-0 right-4 opacity-40 select-none flex gap-2 items-end">
          <PixelIcon name="wave" size={48} />
          <PixelIcon name="seashell" size={40} />
          <PixelIcon name="wave" size={56} />
        </div>
        <div className="absolute top-16 right-12 opacity-30 select-none">
          <PixelIcon name="octopus" size={52} />
        </div>
        <div className="absolute top-20 left-16 opacity-25 select-none">
          <PixelIcon name="bubble" size={36} />
        </div>
        <div className="absolute top-8 right-1/3 opacity-20 select-none">
          <PixelIcon name="sailboat" size={52} />
        </div>
      </>
    ),
    space: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-violet-300 to-fuchsia-200" />
        <div className="absolute top-4 left-8 opacity-40 select-none">
          <PixelIcon name="star" size={36} />
        </div>
        <div className="absolute top-16 right-16 opacity-30 select-none">
          <PixelIcon name="sparkle" size={28} />
        </div>
        <div className="absolute bottom-8 left-12 opacity-35 select-none">
          <PixelIcon name="planet" size={52} />
        </div>
        <div className="absolute bottom-12 right-8 opacity-30 select-none">
          <PixelIcon name="moon" size={40} />
        </div>
        <div className="absolute top-1/3 left-4 opacity-25 select-none">
          <PixelIcon name="ufo" size={36} />
        </div>
        <div className="absolute top-8 right-1/4 opacity-20 select-none">
          <PixelIcon name="rocket" size={64} />
        </div>
      </>
    ),
    dino: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-200 to-yellow-100" />
        <div className="absolute bottom-0 left-4 opacity-40 select-none flex gap-2 items-end">
          <PixelIcon name="palm" size={56} />
          <PixelIcon name="dino" size={52} />
          <PixelIcon name="palm" size={48} />
          <PixelIcon name="leaf" size={36} />
        </div>
        <div className="absolute bottom-0 right-4 opacity-40 select-none flex gap-2 items-end">
          <PixelIcon name="palm" size={48} />
          <PixelIcon name="leaf" size={36} />
          <PixelIcon name="palm" size={56} />
        </div>
        <div className="absolute top-8 right-12 opacity-25 select-none">
          <PixelIcon name="volcano" size={56} />
        </div>
        <div className="absolute top-16 left-16 opacity-30 select-none">
          <PixelIcon name="egg" size={36} />
        </div>
      </>
    ),
    rainbow: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-pink-300 via-rose-200 to-red-100" />
        <div className="absolute top-4 left-1/4 opacity-30 select-none">
          <PixelIcon name="rainbow" size={64} />
        </div>
        <div className="absolute bottom-4 left-8 opacity-35 select-none">
          <PixelIcon name="unicorn" size={52} />
        </div>
        <div className="absolute bottom-8 right-12 opacity-30 select-none">
          <PixelIcon name="castle" size={56} />
        </div>
        <div className="absolute top-12 right-8 opacity-25 select-none">
          <PixelIcon name="crown" size={40} />
        </div>
        <div className="absolute top-1/2 left-4 opacity-20 select-none">
          <PixelIcon name="gem" size={36} />
        </div>
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {backgrounds[theme] || backgrounds.forest}
    </div>
  );
}
