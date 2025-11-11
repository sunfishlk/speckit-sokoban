import { GameSnapshot } from '../types/game';

export class HistoryManager {
  private history: GameSnapshot[] = [];
  private maxSize: number = 100;

  push(snapshot: GameSnapshot): void {
    this.history.push({
      playerPosition: { ...snapshot.playerPosition },
      boxes: snapshot.boxes.map(box => ({ ...box })),
      steps: snapshot.steps
    });

    if (this.history.length > this.maxSize) {
      this.history.shift();
    }
  }

  pop(): GameSnapshot | null {
    return this.history.pop() || null;
  }

  clear(): void {
    this.history = [];
  }

  canUndo(): boolean {
    return this.history.length > 0;
  }

  size(): number {
    return this.history.length;
  }
}
