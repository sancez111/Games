import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GameProvider } from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import WorldMapScreen from './screens/WorldMapScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';
import GameScreen from './screens/GameScreen';
import LevelCompleteScreen from './screens/LevelCompleteScreen';
import TrophyRoomScreen from './screens/TrophyRoomScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="h-screen w-screen overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/worlds" element={<WorldMapScreen />} />
              <Route path="/world/:worldId" element={<LevelSelectScreen />} />
              <Route path="/play/:worldId/:levelIndex" element={<GameScreen />} />
              <Route path="/complete/:worldId/:levelIndex" element={<LevelCompleteScreen />} />
              <Route path="/trophies" element={<TrophyRoomScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
