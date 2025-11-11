import { Level, Position, CellType } from '../types/game';
import { LEVELS } from '../data/levels';

export class LevelLoader {
  static parseLevel(level: Level): {
    playerPosition: Position | null;
    boxes: Position[];
    targets: Position[];
  } {
    const playerPosition: Position | null = null;
    const boxes: Position[] = [];
    const targets: Position[] = [];
    let foundPlayer = false;
    let actualPlayerPos: Position | null = null;

    for (let y = 0; y < level.map.length; y++) {
      const row = level.map[y];
      for (let x = 0; x < row.length; x++) {
        const char = row[x];
        
        switch (char) {
          case '@':
            if (\!foundPlayer) {
              actualPlayerPos = { x, y };
              foundPlayer = true;
            }
            break;
          case '+':
            if (\!foundPlayer) {
              actualPlayerPos = { x, y };
              foundPlayer = true;
            }
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

    return {
      playerPosition: actualPlayerPos,
      boxes,
      targets
    };
  }

  static validateLevel(level: Level): boolean {
    const parsed = this.parseLevel(level);
    
    if (\!parsed.playerPosition) {
      return false;
    }
    
    if (parsed.boxes.length \!== parsed.targets.length) {
      return false;
    }
    
    if (parsed.targets.length \!== level.targetCount) {
      return false;
    }
    
    return true;
  }

  static loadLevelById(id: number): Level | null {
    const level = LEVELS.find(l => l.id === id);
    
    if (\!level) {
      return null;
    }
    
    if (\!this.validateLevel(level)) {
      console.error(`Level ${id} validation failed`);
      return null;
    }
    
    return level;
  }
}
