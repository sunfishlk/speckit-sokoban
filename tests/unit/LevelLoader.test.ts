import { describe, it, expect } from 'vitest';
import { LevelLoader } from '@/core/LevelLoader';
import { Level } from '@/types/game';

describe('LevelLoader', () => {
  const createTestLevel = (): Level => ({
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

  describe('parseLevel', () => {
    it('should parse player position correctly', () => {
      const level = createTestLevel();
      const parsed = LevelLoader.parseLevel(level);
      
      expect(parsed.playerPosition).toEqual({ x: 1, y: 1 });
    });

    it('should parse box positions correctly', () => {
      const level = createTestLevel();
      const parsed = LevelLoader.parseLevel(level);
      
      expect(parsed.boxes).toHaveLength(1);
      expect(parsed.boxes).toContainEqual({ x: 2, y: 2 });
    });

    it('should parse target positions correctly', () => {
      const level = createTestLevel();
      const parsed = LevelLoader.parseLevel(level);
      
      expect(parsed.targets).toHaveLength(1);
      expect(parsed.targets).toContainEqual({ x: 4, y: 1 });
    });

    it('should parse multiple boxes and targets', () => {
      const level: Level = {
        id: 2,
        name: 'Multi Test',
        map: [
          '########',
          '#@  . .#',
          '# $$ $ #',
          '########',
        ],
        width: 8,
        height: 4,
        targetCount: 3
      };
      
      const parsed = LevelLoader.parseLevel(level);
      
      expect(parsed.boxes).toHaveLength(3);
      expect(parsed.targets).toHaveLength(2);
    });

    it('should handle box on target (*)', () => {
      const level: Level = {
        id: 3,
        name: 'Box on Target',
        map: [
          '######',
          '#@  .#',
          '# *  #',
          '######',
        ],
        width: 6,
        height: 4,
        targetCount: 2
      };
      
      const parsed = LevelLoader.parseLevel(level);
      
      expect(parsed.boxes).toContainEqual({ x: 2, y: 2 });
      expect(parsed.targets).toContainEqual({ x: 2, y: 2 });
    });

    it('should handle player on target (+)', () => {
      const level: Level = {
        id: 4,
        name: 'Player on Target',
        map: [
          '######',
          '#+   #',
          '#  $ #',
          '######',
        ],
        width: 6,
        height: 4,
        targetCount: 1
      };
      
      const parsed = LevelLoader.parseLevel(level);
      
      expect(parsed.playerPosition).toEqual({ x: 1, y: 1 });
      expect(parsed.targets).toContainEqual({ x: 1, y: 1 });
    });
  });

  describe('validateLevel', () => {
    it('should validate correct level', () => {
      const level = createTestLevel();
      const result = LevelLoader.validateLevel(level);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing player', () => {
      const level: Level = {
        id: 1,
        name: 'No Player',
        map: [
          '######',
          '#   .#',
          '# $  #',
          '######',
        ],
        width: 6,
        height: 4,
        targetCount: 1
      };
      
      const result = LevelLoader.validateLevel(level);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Level must have exactly one player');
    });

    it('should detect box/target count mismatch', () => {
      const level: Level = {
        id: 1,
        name: 'Mismatch',
        map: [
          '######',
          '#@  .#',
          '# $$ #',
          '######',
        ],
        width: 6,
        height: 4,
        targetCount: 1
      };
      
      const result = LevelLoader.validateLevel(level);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Number of boxes (2) must equal number of targets (1)');
    });

    it('should detect multiple players', () => {
      const level: Level = {
        id: 1,
        name: 'Two Players',
        map: [
          '######',
          '#@ @.#',
          '# $  #',
          '######',
        ],
        width: 6,
        height: 4,
        targetCount: 1
      };
      
      const result = LevelLoader.validateLevel(level);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Level must have exactly one player');
    });
  });

  describe('loadLevelById', () => {
    it('should load existing level', () => {
      const level = LevelLoader.loadLevelById(1);
      
      expect(level).not.toBeNull();
      expect(level!.id).toBe(1);
    });

    it('should return null for non-existent level', () => {
      const level = LevelLoader.loadLevelById(9999);
      
      expect(level).toBeNull();
    });

    it('should load all levels sequentially', () => {
      for (let i = 1; i <= 10; i++) {
        const level = LevelLoader.loadLevelById(i);
        expect(level).not.toBeNull();
        expect(level!.id).toBe(i);
      }
    });
  });
});
