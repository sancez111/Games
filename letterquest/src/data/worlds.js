// World and level configuration for LetterQuest
export const WORLDS = [
  {
    id: 1,
    name: 'Friendly Forest',
    theme: 'forest',
    description: 'Learn your first letters!',
    letters: ['A', 'B', 'C', 'D', 'E', 'F'],
    timer: 10,
    caseMode: 'upper', // only uppercase
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
    timer: 8,
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
    timer: 7,
    caseMode: 'mixed', // introduces lowercase
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
    timer: 6,
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
    timer: 5,
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
export const LETTERS_PER_LEVEL = 10;
export const PASS_THRESHOLD = 7;

// Generate the letters for a specific level within a world
export function generateLevelLetters(worldId, levelIndex) {
  const world = WORLDS[worldId - 1];
  const letters = [];
  const pool = [...world.letters];

  for (let i = 0; i < LETTERS_PER_LEVEL; i++) {
    let letter = pool[Math.floor(Math.random() * pool.length)];

    // Apply case mode
    if (world.caseMode === 'upper') {
      letter = letter.toUpperCase();
    } else if (world.caseMode === 'mixed') {
      // Higher levels in mixed mode have more lowercase
      const lowercaseChance = 0.3 + (levelIndex * 0.1);
      if (Math.random() < lowercaseChance) {
        letter = letter.toLowerCase();
      }
    }

    letters.push(letter);
  }

  return letters;
}

// Check if an answer is correct based on world's case mode
export function checkAnswer(input, target, worldId) {
  if (worldId <= 2) {
    // Case-insensitive for worlds 1-2
    return input.toLowerCase() === target.toLowerCase();
  }
  // Case-sensitive for worlds 3-5
  return input === target;
}
