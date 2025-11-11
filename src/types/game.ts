export interface Position {
  x: number;
  y: number;
}

export enum CellType {
  Wall = 'wall',
  Empty = 'empty',
  Target = 'target',
  Box = 'box',
  BoxOnTarget = 'box-on-target',
  Player = 'player',
  PlayerOnTarget = 'player-on-target',
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export const DIRECTION_VECTORS: Record<Direction, Position> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
};

export interface Level {
  id: number;
  name?: string;
  map: string[];
  width: number;
  height: number;
  targetCount: number;
}

export interface GameState {
  level: Level;
  playerPosition: Position;
  boxes: Position[];
  targets: Position[];
  steps: number;
  isWin: boolean;
}

export interface GameSnapshot {
  playerPosition: Position;
  boxes: Position[];
  steps: number;
}

export interface SaveData {
  currentLevel: number;
  unlockedLevels: number[];
  bestSteps: Record<number, number>;
}
