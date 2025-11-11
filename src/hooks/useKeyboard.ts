import { useEffect } from 'react';
import { Direction } from '@/types/game';

interface UseKeyboardProps {
  onMove: (direction: Direction) => void;
  onUndo?: () => void;
  onRestart?: () => void;
}

export const useKeyboard = ({ onMove, onUndo, onRestart }: UseKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        'ArrowUp': Direction.Up,
        'ArrowDown': Direction.Down,
        'ArrowLeft': Direction.Left,
        'ArrowRight': Direction.Right,
      };

      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        onMove(direction);
        return;
      }

      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        onUndo?.();
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        onRestart?.();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove, onUndo, onRestart]);
};
