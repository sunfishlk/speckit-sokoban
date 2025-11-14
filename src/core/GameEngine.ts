import { GameState, Direction, Position, CellType, DIRECTION_VECTORS } from '@/types/game';

export class GameEngine {
  static getCellType(state: GameState, pos: Position): CellType {
    if (pos.x === state.playerPosition.x && pos.y === state.playerPosition.y) {
      const isOnTarget = state.targets.some(t => t.x === pos.x && t.y === pos.y);
      return isOnTarget ? CellType.PlayerOnTarget : CellType.Player;
    }

    const hasBox = state.boxes.some(b => b.x === pos.x && b.y === pos.y);
    if (hasBox) {
      const isOnTarget = state.targets.some(t => t.x === pos.x && t.y === pos.y);
      return isOnTarget ? CellType.BoxOnTarget : CellType.Box;
    }

    const isTarget = state.targets.some(t => t.x === pos.x && t.y === pos.y);
    if (isTarget) {
      return CellType.Target;
    }

    if (!this.isValidPosition(state, pos)) {
      return CellType.Wall;
    }

    const mapChar = state.level.map[pos.y]?.[pos.x];
    if (mapChar === '#') {
      return CellType.Wall;
    }

    return CellType.Empty;
  }

  static isValidPosition(state: GameState, pos: Position): boolean {
    return pos.x >= 0 && pos.x < state.level.width &&
           pos.y >= 0 && pos.y < state.level.height;
  }

  static checkWin(boxes: Position[], targets: Position[]): boolean {
    return targets.every(target =>
      boxes.some(box => box.x === target.x && box.y === target.y)
    );
  }

  static move(state: GameState, direction: Direction): GameState {
    if (!state || !direction) {
      return state;
    }

    const vector = DIRECTION_VECTORS[direction];
    const newPlayerPos: Position = {
      x: state.playerPosition.x + vector.x,
      y: state.playerPosition.y + vector.y,
    };

    if (!this.isValidPosition(state, newPlayerPos)) {
      return state;
    }

    const targetCellType = this.getCellType(state, newPlayerPos);

    if (targetCellType === CellType.Wall) {
      return state;
    }

    if (targetCellType === CellType.Empty || targetCellType === CellType.Target) {
      return {
        ...state,
        playerPosition: newPlayerPos,
        steps: state.steps + 1,
        isWin: this.checkWin(state.boxes, state.targets),
      };
    }

    if (targetCellType === CellType.Box || targetCellType === CellType.BoxOnTarget) {
      const newBoxPos: Position = {
        x: newPlayerPos.x + vector.x,
        y: newPlayerPos.y + vector.y,
      };

      if (!this.isValidPosition(state, newBoxPos)) {
        return state;
      }

      const boxDestCellType = this.getCellType(state, newBoxPos);
      
      if (boxDestCellType === CellType.Wall || 
          boxDestCellType === CellType.Box || 
          boxDestCellType === CellType.BoxOnTarget) {
        return state;
      }

      const newBoxes = state.boxes.map(box =>
        box.x === newPlayerPos.x && box.y === newPlayerPos.y
          ? newBoxPos
          : box
      );

      const isWin = this.checkWin(newBoxes, state.targets);

      return {
        ...state,
        playerPosition: newPlayerPos,
        boxes: newBoxes,
        steps: state.steps + 1,
        isWin,
      };
    }

    return state;
  }
}
