import { GameState, Position } from '@/types/game';
import { GameEngine } from '@/core/GameEngine';
import { Cell } from './Cell';

interface GameBoardProps {
  gameState: GameState;
}

export const GameBoard = ({ gameState }: GameBoardProps) => {
  const { level } = gameState;

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < level.height; y++) {
      for (let x = 0; x < level.width; x++) {
        const pos: Position = { x, y };
        const cellType = GameEngine.getCellType(gameState, pos);
        grid.push(<Cell key={`${x}-${y}`} type={cellType} testId={`cell-${x}-${y}`} />);
      }
    }
    return grid;
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${level.width}, 40px)`,
    gap: '0',
    justifyContent: 'center',
    margin: '20px auto',
  };

  const infoStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <div>
      <div style={infoStyle}>
        <div>Level {level.id}: {level.name}</div>
        <div>Steps: {gameState.steps}</div>
      </div>
      <div style={gridStyle} role="grid">
        {renderGrid()}
      </div>
    </div>
  );
};
