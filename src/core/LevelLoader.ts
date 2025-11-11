import { Level, GameState, Position } from '@/types/game';
import { LEVELS } from '@/data/levels';

export class LevelLoader {
  static parseLevel(level: Level): GameState {
    let playerPosition: Position | null = null;
    const boxes: Position[] = [];
    const targets: Position[] = [];

    for (let y = 0; y < level.map.length; y++) {
      const row = level.map[y];
      for (let x = 0; x < row.length; x++) {
        const char = row[x];
        
        switch (char) {
          case '@':
            playerPosition = { x, y };
            break;
          case '+':
            playerPosition = { x, y };
            targets.push({ x, y });
            break;
          case '$':
            boxes.push({ x, y });
            break;
          case '*':
            boxes.push({ x, y });
            targets.push({ x, y });
            break;
          case '.':
            targets.push({ x, y });
            break;
        }
      }
    }

    if (!playerPosition) {
      throw new Error('Invalid level: no player found');
    }

    if (boxes.length !== targets.length) {
      throw new Error('Boxes and targets mismatch');
    }

    return {
      level,
      playerPosition,
      boxes,
      targets,
      steps: 0,
      isWin: false,
    };
  }

  static validateLevel(level: Level): boolean {
    if (!level.map || level.map.length === 0) {
      console.error('Empty map');
      return false;
    }

    if (level.map.length !== level.height) {
      console.error('Map height mismatch');
      return false;
    }

    for (const row of level.map) {
      if (row.length !== level.width) {
        console.error('Map width mismatch');
        return false;
      }
    }

    let playerCount = 0;
    let boxCount = 0;
    let targetCount = 0;

    for (const row of level.map) {
      for (const char of row) {
        if (char === '@') playerCount++;
        if (char === '+') {
          playerCount++;
          targetCount++;
        }
        if (char === '$') boxCount++;
        if (char === '*') {
          boxCount++;
          targetCount++;
        }
        if (char === '.') targetCount++;
      }
    }

    if (playerCount !== 1) {
      console.error('Invalid player count:', playerCount);
      return false;
    }

    if (boxCount !== targetCount) {
      console.error('Boxes and targets mismatch:', boxCount, targetCount);
      return false;
    }

    return true;
  }

  static loadLevelById(id: number): Level | null {
    return LEVELS.find(level => level.id === id) || null;
  }
}
