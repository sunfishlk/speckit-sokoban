import { GameState, Position, Direction, DIRECTION_VECTORS, CellType, Level } from '../types/game';

export class GameEngine {
  static getCellType(
    position: Position,
    gameState: GameState
  ): CellType {
    const { x, y } = position;
    const { level, playerPosition, boxes, targets } = gameState;
    
    if (y < 0 || y >= level.map.length || x < 0 || x >= level.map[y].length) {
      return CellType.Wall;
    }
    
    const char = level.map[y][x];
    
    if (char === '#') {
      return CellType.Wall;
    }
    
    const isPlayer = playerPosition.x === x && playerPosition.y === y;
    const hasBox = boxes.some(box => box.x === x && box.y === y);
    const isTarget = targets.some(target => target.x === x && target.y === y);
    
    if (isPlayer && isTarget) return CellType.PlayerOnTarget;
    if (isPlayer) return CellType.Player;
    if (hasBox && isTarget) return CellType.BoxOnTarget;
    if (hasBox) return CellType.Box;
    if (isTarget) return CellType.Target;
    
    return CellType.Empty;
  }

  static isValidPosition(position: Position, level: Level): boolean {
    const { x, y } = position;
    
    if (y < 0 || y >= level.map.length || x < 0 || x >= level.map[y].length) {
      return false;
    }
    
    const char = level.map[y][x];
    return char \!== '#';
  }

  static checkWin(gameState: GameState): boolean {
    const { boxes, targets } = gameState;
    
    return targets.every(target =>
      boxes.some(box => box.x === target.x && box.y === target.y)
    );
  }

  static move(
    gameState: GameState,
    direction: Direction
  ): GameState | null {
    const { level, playerPosition, boxes, steps } = gameState;
    const delta = DIRECTION_VECTORS[direction];
    
    const newPlayerPos: Position = {
      x: playerPosition.x + delta.x,
      y: playerPosition.y + delta.y
    };
    
    if (\!this.isValidPosition(newPlayerPos, level)) {
      return null;
    }
    
    const boxIndex = boxes.findIndex(
      box => box.x === newPlayerPos.x && box.y === newPlayerPos.y
    );
    
    if (boxIndex \!== -1) {
      const newBoxPos: Position = {
        x: newPlayerPos.x + delta.x,
        y: newPlayerPos.y + delta.y
      };
      
      if (\!this.isValidPosition(newBoxPos, level)) {
        return null;
      }
      
      const hasAnotherBox = boxes.some(
        box => box.x === newBoxPos.x && box.y === newBoxPos.y
      );
      
      if (hasAnotherBox) {
        return null;
      }
      
      const newBoxes = [...boxes];
      newBoxes[boxIndex] = newBoxPos;
      
      const newState: GameState = {
        ...gameState,
        playerPosition: newPlayerPos,
        boxes: newBoxes,
        steps: steps + 1,
        isWin: false
      };
      
      newState.isWin = this.checkWin(newState);
      
      return newState;
    }
    
    const newState: GameState = {
      ...gameState,
      playerPosition: newPlayerPos,
      steps: steps + 1
    };
    
    return newState;
  }
}
