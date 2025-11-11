import React, { useCallback, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { WinDialog } from './components/WinDialog';
import { Controls } from './components/Controls';
import { LevelSelector } from './components/LevelSelector';
import { useGameState } from './hooks/useGameState';
import { useKeyboard } from './hooks/useKeyboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LEVELS } from './data/levels';

function App() {
  const { saveData, unlockLevel, updateBestSteps, setCurrentLevel } = useLocalStorage();
  const [isLevelSelectorOpen, setIsLevelSelectorOpen] = useState(false);

  const handleWin = useCallback((levelId: number, steps: number) => {
    updateBestSteps(levelId, steps);
    
    const nextLevelId = levelId + 1;
    if (nextLevelId <= LEVELS.length) {
      unlockLevel(nextLevelId);
    }
  }, [unlockLevel, updateBestSteps]);

  const { gameState, move, undo, canUndo, restart, loadLevel } = useGameState(
    saveData.currentLevel,
    { onWin: handleWin }
  );

  useKeyboard({
    onMove: move,
    onUndo: undo,
    onRestart: restart
  });

  const handleSelectLevel = useCallback((levelId: number) => {
    loadLevel(levelId);
    setCurrentLevel(levelId);
    setIsLevelSelectorOpen(false);
  }, [loadLevel, setCurrentLevel]);

  if (!gameState) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>加载关卡失败</h1>
      </div>
    );
  }

  const bestSteps = saveData.bestSteps[gameState.level.id];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#e3f2fd',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ marginBottom: '20px' }}>推箱子游戏</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p>关卡: {gameState.level.id} - {gameState.level.name}</p>
        <p>步数: {gameState.steps}{bestSteps ? ` | 最佳: ${bestSteps}` : ''}</p>
      </div>
      <GameBoard gameState={gameState} />
      <Controls 
        onUndo={undo} 
        onRestart={restart} 
        onOpenLevelSelector={() => setIsLevelSelectorOpen(true)}
        canUndo={canUndo} 
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>使用方向键 ↑ ↓ ← → 控制移动 | Z 撤销 | R 重新开始</p>
      </div>
      <WinDialog isVisible={gameState.isWin} steps={gameState.steps} />
      <LevelSelector
        isVisible={isLevelSelectorOpen}
        unlockedLevels={saveData.unlockedLevels}
        currentLevel={gameState.level.id}
        bestSteps={saveData.bestSteps}
        onSelectLevel={handleSelectLevel}
        onClose={() => setIsLevelSelectorOpen(false)}
      />
    </div>
  );
}

export default App;
