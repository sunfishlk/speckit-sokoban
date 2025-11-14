import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from '@/components/GameBoard';
import { GameState } from '@/types/game';

describe('GameBoard', () => {
  const createGameState = (): GameState => ({
    level: {
      id: 1,
      name: 'Test Level',
      map: [
        '####',
        '#@.#',
        '#$ #',
        '####',
      ],
      width: 4,
      height: 4,
      targetCount: 1
    },
    playerPosition: { x: 1, y: 1 },
    boxes: [{ x: 1, y: 2 }],
    targets: [{ x: 2, y: 1 }],
    steps: 0,
    isWin: false
  });

  it('should render game board', () => {
    const state = createGameState();
    render(<GameBoard gameState={state} />);
    
    const board = screen.getByRole('grid');
    expect(board).toBeInTheDocument();
  });

  it('should render correct number of cells', () => {
    const state = createGameState();
    const { container } = render(<GameBoard gameState={state} />);
    
    const cells = container.querySelectorAll('[data-testid^="cell-"]');
    expect(cells).toHaveLength(16);
  });

  it('should render player cell', () => {
    const state = createGameState();
    const { container } = render(<GameBoard gameState={state} />);
    
    const playerCell = container.querySelector('[data-testid="cell-1-1"]');
    expect(playerCell).toBeInTheDocument();
    expect(playerCell?.textContent).toContain('👨');
  });

  it('should render box cells', () => {
    const state = createGameState();
    const { container } = render(<GameBoard gameState={state} />);
    
    const boxCell = container.querySelector('[data-testid="cell-1-2"]');
    expect(boxCell).toBeInTheDocument();
    expect(boxCell?.textContent).toContain('📦');
  });

  it('should render target cells', () => {
    const state = createGameState();
    const { container } = render(<GameBoard gameState={state} />);
    
    const targetCell = container.querySelector('[data-testid="cell-2-1"]');
    expect(targetCell).toBeInTheDocument();
    expect(targetCell?.textContent).toContain('🎯');
  });

  it('should render wall cells', () => {
    const state = createGameState();
    const { container } = render(<GameBoard gameState={state} />);
    
    const wallCell = container.querySelector('[data-testid="cell-0-0"]');
    expect(wallCell).toBeInTheDocument();
  });
});
