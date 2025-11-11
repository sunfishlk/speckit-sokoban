import React from 'react';
import { GameState } from '../types/game';
import { GameEngine } from '../core/GameEngine';
import { Cell } from './Cell';

interface GameBoardProps {
  gameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const { level } = gameState;

  const renderBoard = () => {
    const rows = [];
    
    for (let y = 0; y < level.height; y++) {
      const cells = [];
      for (let x = 0; x < level.width; x++) {
        const cellType = GameEngine.getCellType({ x, y }, gameState);
        cells.push(<Cell key={`${x}-${y}`} type={cellType} />);
      }
      rows.push(
        <div key={y} style={{ display: 'flex' }}>
          {cells}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div style={{ 
      display: 'inline-block',
      border: '2px solid #333',
      padding: '10px',
      backgroundColor: '#fff'
    }}>
      {renderBoard()}
    </div>
  );
};
