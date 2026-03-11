import { createContext, useContext, useReducer, useEffect } from 'react';
import { LEVELS_PER_WORLD } from '../data/worlds';

const GameContext = createContext(null);

const STORAGE_KEY = 'letterquest-save';

const initialState = {
  currentWorld: 1,
  currentLevel: 1,
  unlockedWorlds: [1],
  unlockedLevels: { 1: [1], 2: [], 3: [], 4: [], 5: [] },
  medals: {},
  trophies: [],
  totalPoints: 0,
  settings: { soundEnabled: true, musicEnabled: true },
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed };
    }
  } catch (e) {
    // ignore corrupt data
  }
  return initialState;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore storage errors
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_LEVEL': {
      const { worldId, levelIndex, score, medal } = action.payload;
      const key = `${worldId}-${levelIndex}`;

      // Only upgrade medals, never downgrade
      const existingMedal = state.medals[key];
      const medalRank = { bronze: 1, silver: 2, gold: 3 };
      const newMedal =
        !existingMedal || medalRank[medal] > medalRank[existingMedal]
          ? medal
          : existingMedal;

      const newMedals = { ...state.medals, [key]: newMedal };
      const newPoints = state.totalPoints + score;

      // Unlock next level
      const newUnlockedLevels = { ...state.unlockedLevels };
      const worldLevels = [...(newUnlockedLevels[worldId] || [])];

      if (levelIndex < LEVELS_PER_WORLD && !worldLevels.includes(levelIndex + 1)) {
        worldLevels.push(levelIndex + 1);
        newUnlockedLevels[worldId] = worldLevels;
      }

      // Check if world is complete (all 5 levels have medals)
      const newTrophies = [...state.trophies];
      const newUnlockedWorlds = [...state.unlockedWorlds];
      const allLevelsComplete = Array.from({ length: LEVELS_PER_WORLD }, (_, i) => i + 1)
        .every(l => newMedals[`${worldId}-${l}`]);

      if (allLevelsComplete && !newTrophies.includes(worldId)) {
        newTrophies.push(worldId);
      }

      // Unlock next world if current world's level 5 is beaten
      if (levelIndex === LEVELS_PER_WORLD && worldId < 5) {
        const nextWorld = worldId + 1;
        if (!newUnlockedWorlds.includes(nextWorld)) {
          newUnlockedWorlds.push(nextWorld);
          if (!newUnlockedLevels[nextWorld] || newUnlockedLevels[nextWorld].length === 0) {
            newUnlockedLevels[nextWorld] = [1];
          }
        }
      }

      return {
        ...state,
        medals: newMedals,
        totalPoints: newPoints,
        trophies: newTrophies,
        unlockedWorlds: newUnlockedWorlds,
        unlockedLevels: newUnlockedLevels,
      };
    }

    case 'SET_CURRENT': {
      return {
        ...state,
        currentWorld: action.payload.world,
        currentLevel: action.payload.level,
      };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    }

    case 'RESET_PROGRESS': {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
