import { useState, useCallback } from 'react';
import { GameState, Direction, Level } from '../types/game';
import { GameEngine } from '../core/GameEngine';
import { LevelLoader } from '../core/LevelLoader';

export const useGameState = (levelId: number) => {
  const [gameState, setGameState] = useState<GameState | null>(() => {
    const level = LevelLoader.loadLevelById(levelId);
    if (\!level) return null;

    const parsed = LevelLoader.parseLevel(level);
    if (\!parsed.playerPosition) return null;

    return {
      level,
      playerPosition: parsed.playerPosition,
      boxes: parsed.boxes,
      targets: parsed.targets,
      steps: 0,
      isWin: false
    };
  });

  const move = useCallback((direction: Direction) => {
    setGameState(prev => {
      if (\!prev || prev.isWin) return prev;
      
      const newState = GameEngine.move(prev, direction);
      return newState || prev;
    });
  }, []);

  return {
    gameState,
    move
  };
};
