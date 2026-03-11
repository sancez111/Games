// World and level configuration for LetterQuest Tower Defense
export const WORLDS = [
  {
    id: 1,
    name: 'Friendly Forest',
    theme: 'forest',
    description: 'Learn your first letters!',
    letters: ['A', 'B', 'C', 'D', 'E', 'F'],
    timer: 12,
    caseMode: 'upper',
    colors: {
      primary: '#43a047',
      secondary: '#66bb6a',
      bg: 'from-green-200 via-emerald-100 to-lime-100',
      accent: '#2e7d32',
      light: '#e8f5e9',
    },
    icon: 'tree',
  },
  {
    id: 2,
    name: 'Ocean Adventure',
    theme: 'ocean',
    description: 'Dive into more letters!',
    letters: ['G', 'H', 'I', 'J', 'K', 'L', 'A', 'B', 'C', 'D', 'E', 'F'],
    timer: 10,
    caseMode: 'upper',
    colors: {
      primary: '#0097a7',
      secondary: '#26c6da',
      bg: 'from-cyan-200 via-sky-100 to-blue-100',
      accent: '#006064',
      light: '#e0f7fa',
    },
    icon: 'wave',
  },
  {
    id: 3,
    name: 'Space Explorer',
    theme: 'space',
    description: 'Explore uppercase and lowercase!',
    letters: ['M', 'N', 'O', 'P', 'Q', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    timer: 8,
    caseMode: 'mixed',
    colors: {
      primary: '#8e24aa',
      secondary: '#ab47bc',
      bg: 'from-purple-200 via-violet-100 to-fuchsia-100',
      accent: '#6a1b9a',
      light: '#f3e5f5',
    },
    icon: 'rocket',
  },
  {
    id: 4,
    name: 'Dino Land',
    theme: 'dino',
    description: 'Almost all the letters!',
    letters: ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    timer: 7,
    caseMode: 'mixed',
    colors: {
      primary: '#f57c00',
      secondary: '#ffa726',
      bg: 'from-orange-200 via-amber-100 to-yellow-100',
      accent: '#e65100',
      light: '#fff3e0',
    },
    icon: 'dino',
  },
  {
    id: 5,
    name: 'Rainbow Kingdom',
    theme: 'rainbow',
    description: 'The ultimate challenge!',
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    timer: 6,
    caseMode: 'mixed',
    colors: {
      primary: '#d81b60',
      secondary: '#ec407a',
      bg: 'from-pink-200 via-rose-100 to-red-100',
      accent: '#ad1457',
      light: '#fce4ec',
    },
    icon: 'rainbow',
  },
];

export const LEVELS_PER_WORLD = 5;
export const LETTERS_PER_LEVEL = 5;
export const PASS_THRESHOLD = 3;

// Tower defense config per level
export function getLevelConfig(worldId, levelIndex) {
  const world = WORLDS[worldId - 1];
  if (!world) return null;

  const worldDiff = worldId - 1;
  const levelDiff = levelIndex - 1;

  // Wave size: 4-13 letters depending on progression
  const waveSize = 4 + levelDiff + worldDiff;

  // Timer per letter (seconds)
  const timer = Math.max(4, world.timer - levelDiff * 0.5);

  // Castle HP
  const playerHP = 5 + worldDiff;
  const enemyHP = 3 + levelDiff + worldDiff;

  // Power-ups available (unlock progressively)
  const powerups = ['shield'];
  if (worldId >= 2 || levelIndex >= 3) powerups.push('slowTime');
  if (worldId >= 3 || (worldId >= 2 && levelIndex >= 4)) powerups.push('fireball');

  return {
    worldId, levelIndex, waveSize, timer,
    playerHP, enemyHP,
    enemyAttack: 1,
    playerAttack: 1,
    fireballDamage: 2 + Math.floor(worldDiff / 2),
    powerups,
    letters: world.letters,
    caseMode: world.caseMode,
  };
}

// Generate the letters for a level
export function generateLevelLetters(worldId, levelIndex) {
  const config = getLevelConfig(worldId, levelIndex);
  if (!config) return [];

  const letters = [];
  const pool = [...config.letters];

  for (let i = 0; i < config.waveSize; i++) {
    let letter = pool[Math.floor(Math.random() * pool.length)];

    if (config.caseMode === 'upper') {
      letter = letter.toUpperCase();
    } else if (config.caseMode === 'mixed') {
      const lowercaseChance = 0.3 + (levelIndex * 0.1);
      if (Math.random() < lowercaseChance) {
        letter = letter.toLowerCase();
      }
    }

    letters.push(letter);
  }

  return letters;
}

// Check answer correctness
export function checkAnswer(input, target, worldId) {
  if (worldId <= 2) {
    return input.toLowerCase() === target.toLowerCase();
  }
  return input === target;
}
