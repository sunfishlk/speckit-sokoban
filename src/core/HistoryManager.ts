import { GameSnapshot } from '@/types/game';

const MAX_HISTORY_SIZE = 100;

export class HistoryManager {
  private history: GameSnapshot[] = [];

  push(snapshot: GameSnapshot): void {
    this.history.push(snapshot);
    
    if (this.history.length > MAX_HISTORY_SIZE) {
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
