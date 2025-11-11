import { describe, it, expect, beforeEach } from 'vitest';
import { HistoryManager } from '@/core/HistoryManager';
import { GameSnapshot } from '@/types/game';

describe('HistoryManager', () => {
  let manager: HistoryManager;

  beforeEach(() => {
    manager = new HistoryManager();
  });

  const createSnapshot = (step: number): GameSnapshot => ({
    playerPosition: { x: step, y: step },
    boxes: [{ x: step + 1, y: step + 1 }],
    steps: step
  });

  describe('push', () => {
    it('should add snapshot to history', () => {
      const snapshot = createSnapshot(1);
      manager.push(snapshot);
      
      expect(manager.size()).toBe(1);
      expect(manager.canUndo()).toBe(true);
    });

    it('should add multiple snapshots', () => {
      manager.push(createSnapshot(1));
      manager.push(createSnapshot(2));
      manager.push(createSnapshot(3));
      
      expect(manager.size()).toBe(3);
    });

    it('should enforce max size limit', () => {
      for (let i = 0; i < 150; i++) {
        manager.push(createSnapshot(i));
      }
      
      expect(manager.size()).toBe(100);
    });
  });

  describe('pop', () => {
    it('should return null when history is empty', () => {
      const result = manager.pop();
      expect(result).toBeNull();
    });

    it('should return and remove last snapshot', () => {
      const snapshot1 = createSnapshot(1);
      const snapshot2 = createSnapshot(2);
      
      manager.push(snapshot1);
      manager.push(snapshot2);
      
      const popped = manager.pop();
      expect(popped).toEqual(snapshot2);
      expect(manager.size()).toBe(1);
    });

    it('should return snapshots in LIFO order', () => {
      manager.push(createSnapshot(1));
      manager.push(createSnapshot(2));
      manager.push(createSnapshot(3));
      
      expect(manager.pop()?.steps).toBe(3);
      expect(manager.pop()?.steps).toBe(2);
      expect(manager.pop()?.steps).toBe(1);
      expect(manager.pop()).toBeNull();
    });
  });

  describe('clear', () => {
    it('should remove all snapshots', () => {
      manager.push(createSnapshot(1));
      manager.push(createSnapshot(2));
      manager.push(createSnapshot(3));
      
      manager.clear();
      
      expect(manager.size()).toBe(0);
      expect(manager.canUndo()).toBe(false);
    });

    it('should allow pushing after clear', () => {
      manager.push(createSnapshot(1));
      manager.clear();
      manager.push(createSnapshot(2));
      
      expect(manager.size()).toBe(1);
      expect(manager.pop()?.steps).toBe(2);
    });
  });

  describe('canUndo', () => {
    it('should return false when history is empty', () => {
      expect(manager.canUndo()).toBe(false);
    });

    it('should return true when history has snapshots', () => {
      manager.push(createSnapshot(1));
      expect(manager.canUndo()).toBe(true);
    });

    it('should return false after popping all snapshots', () => {
      manager.push(createSnapshot(1));
      manager.pop();
      expect(manager.canUndo()).toBe(false);
    });
  });

  describe('size', () => {
    it('should return 0 for empty history', () => {
      expect(manager.size()).toBe(0);
    });

    it('should return correct size after operations', () => {
      expect(manager.size()).toBe(0);
      
      manager.push(createSnapshot(1));
      expect(manager.size()).toBe(1);
      
      manager.push(createSnapshot(2));
      expect(manager.size()).toBe(2);
      
      manager.pop();
      expect(manager.size()).toBe(1);
      
      manager.clear();
      expect(manager.size()).toBe(0);
    });
  });
});
