import { describe, it, expect } from 'vitest';
import { GameEngine } from '@/core/GameEngine';
import { Direction, GameState, CellType } from '@/types/game';

describe('GameEngine', () => {
  const createTestLevel = () => ({
    id: 1,
    name: 'Test Level',
    map: [
      '######',
      '#@  .#',
      '# $  #',
      '######',
    ],
    width: 6,
    height: 4,
    targetCount: 1
  });

  const createGameState = (): GameState => ({
    level: createTestLevel(),
    playerPosition: { x: 1, y: 1 },
    boxes: [{ x: 2, y: 2 }],
    targets: [{ x: 4, y: 1 }],
    steps: 0,
    isWin: false
  });

  describe('move', () => {
    it('should move player to empty space', () => {
      const state = createGameState();
      const newState = GameEngine.move(state, Direction.Right);
      
      expect(newState.playerPosition).toEqual({ x: 2, y: 1 });
      expect(newState.steps).toBe(1);
    });

    it('should not move player into wall (returns same state)', () => {
      const state = createGameState();
      const newState = GameEngine.move(state, Direction.Up);
      
      expect(newState.playerPosition).toEqual(state.playerPosition);
      expect(newState.steps).toBe(0);
    });

    it('should push box to empty space', () => {
      const state = createGameState();
      state.playerPosition = { x: 1, y: 2 };
      const newState = GameEngine.move(state, Direction.Right);
      
      expect(newState.playerPosition).toEqual({ x: 2, y: 2 });
      expect(newState.boxes).toContainEqual({ x: 3, y: 2 });
      expect(newState.steps).toBe(1);
    });

    it('should not push box into wall', () => {
      const state = createGameState();
      state.playerPosition = { x: 2, y: 1 };
      state.boxes = [{ x: 2, y: 2 }];
      const newState = GameEngine.move(state, Direction.Down);
      
      expect(newState.playerPosition).toEqual({ x: 2, y: 1 });
      expect(newState.steps).toBe(0);
    });

    it('should not push box into another box', () => {
      const state = createGameState();
      state.playerPosition = { x: 1, y: 2 };
      state.boxes = [{ x: 2, y: 2 }, { x: 3, y: 2 }];
      const newState = GameEngine.move(state, Direction.Right);
      
      expect(newState.playerPosition).toEqual({ x: 1, y: 2 });
      expect(newState.steps).toBe(0);
    });
  });

  describe('checkWin', () => {
    it('should return true when all boxes are on targets', () => {
      const boxes = [{ x: 4, y: 1 }];
      const targets = [{ x: 4, y: 1 }];
      
      const result = GameEngine.checkWin(boxes, targets);
      expect(result).toBe(true);
    });

    it('should return false when not all boxes are on targets', () => {
      const boxes = [{ x: 2, y: 2 }];
      const targets = [{ x: 4, y: 1 }];
      
      const result = GameEngine.checkWin(boxes, targets);
      expect(result).toBe(false);
    });

    it('should return true with multiple boxes on multiple targets', () => {
      const boxes = [{ x: 4, y: 1 }, { x: 5, y: 1 }];
      const targets = [{ x: 4, y: 1 }, { x: 5, y: 1 }];
      
      const result = GameEngine.checkWin(boxes, targets);
      expect(result).toBe(true);
    });

    it('should return false when only some boxes are on targets', () => {
      const boxes = [{ x: 4, y: 1 }, { x: 2, y: 2 }];
      const targets = [{ x: 4, y: 1 }, { x: 5, y: 1 }];
      
      const result = GameEngine.checkWin(boxes, targets);
      expect(result).toBe(false);
    });
  });

  describe('isValidPosition', () => {
    it('should return true for positions within bounds', () => {
      const state = createGameState();
      expect(GameEngine.isValidPosition(state, { x: 1, y: 1 })).toBe(true);
    });

    it('should return false for negative coordinates', () => {
      const state = createGameState();
      expect(GameEngine.isValidPosition(state, { x: -1, y: 1 })).toBe(false);
    });

    it('should return false for positions outside width', () => {
      const state = createGameState();
      expect(GameEngine.isValidPosition(state, { x: 10, y: 1 })).toBe(false);
    });

    it('should return false for positions outside height', () => {
      const state = createGameState();
      expect(GameEngine.isValidPosition(state, { x: 1, y: 10 })).toBe(false);
    });
  });

  describe('getCellType', () => {
    it('should return Wall for wall position', () => {
      const state = createGameState();
      const cellType = GameEngine.getCellType(state, { x: 0, y: 0 });
      expect(cellType).toBe(CellType.Wall);
    });

    it('should return Empty for empty position', () => {
      const state = createGameState();
      const cellType = GameEngine.getCellType(state, { x: 2, y: 1 });
      expect(cellType).toBe(CellType.Empty);
    });

    it('should return Target for target position', () => {
      const state = createGameState();
      const cellType = GameEngine.getCellType(state, { x: 4, y: 1 });
      expect(cellType).toBe(CellType.Target);
    });

    it('should return Player for player position', () => {
      const state = createGameState();
      const cellType = GameEngine.getCellType(state, { x: 1, y: 1 });
      expect(cellType).toBe(CellType.Player);
    });
  });
});
