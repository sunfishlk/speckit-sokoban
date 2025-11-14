import React from 'react';
import { GameBoard } from './components/GameBoard';
import { WinDialog } from './components/WinDialog';
import { useGameState } from './hooks/useGameState';
import { useKeyboard } from './hooks/useKeyboard';

function App() {
  const { gameState, move } = useGameState(1);

  useKeyboard({
    onMove: move,
    enabled: \!\!gameState && \!gameState.isWin
  });

  if (\!gameState) {
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
      <div style={{ marginBottom: '20px' }}>
        <p>关卡: {gameState.level.id} - {gameState.level.name}</p>
        <p>步数: {gameState.steps}</p>
      </div>
      <GameBoard gameState={gameState} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>使用方向键 ↑ ↓ ← → 控制移动</p>
      </div>
      <WinDialog isVisible={gameState.isWin} steps={gameState.steps} />
    </div>
  );
}

export default App;
