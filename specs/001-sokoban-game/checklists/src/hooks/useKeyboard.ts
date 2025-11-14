import { useEffect } from 'react';
import { Direction } from '../types/game';

interface UseKeyboardProps {
  onMove: (direction: Direction) => void;
  enabled?: boolean;
}

export const useKeyboard = ({ onMove, enabled = true }: UseKeyboardProps) => {
  useEffect(() => {
    if (\!enabled) return;

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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove, enabled]);
};
