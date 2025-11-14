import { useState, useCallback, useRef, useEffect } from 'react';
import { GameState, Direction } from '../types/game';
import { GameEngine } from '../core/GameEngine';
import { LevelLoader } from '../core/LevelLoader';
import { HistoryManager } from '../core/HistoryManager';

interface UseGameStateOptions {
  onWin?: (levelId: number, steps: number) => void;
}

export const useGameState = (levelId: number, options?: UseGameStateOptions) => {
  const historyRef = useRef(new HistoryManager());
  const [currentLevelId, setCurrentLevelId] = useState(levelId);
  
  const initializeLevel = useCallback((id: number) => {
    const level = LevelLoader.loadLevelById(id);
    if (!level) return null;

    const parsed = LevelLoader.parseLevel(level);
    if (!parsed.playerPosition) return null;

    return {
      level,
      playerPosition: parsed.playerPosition,
      boxes: parsed.boxes,
      targets: parsed.targets,
      steps: 0,
      isWin: false
    };
  }, []);

  const [gameState, setGameState] = useState<GameState | null>(() => 
    initializeLevel(currentLevelId)
  );

  useEffect(() => {
    if (gameState?.isWin && options?.onWin) {
      options.onWin(gameState.level.id, gameState.steps);
    }
  }, [gameState?.isWin, gameState?.level.id, gameState?.steps, options]);

  const move = useCallback((direction: Direction) => {
    setGameState(prev => {
      if (!prev || prev.isWin) return prev;
      
      historyRef.current.push({
        playerPosition: prev.playerPosition,
        boxes: prev.boxes,
        steps: prev.steps
      });
      
      const newState = GameEngine.move(prev, direction);
      return newState || prev;
    });
  }, []);

  const undo = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev;
      
      const snapshot = historyRef.current.pop();
      if (!snapshot) return prev;
      
      return {
        ...prev,
        playerPosition: snapshot.playerPosition,
        boxes: snapshot.boxes,
        steps: snapshot.steps,
        isWin: false
      };
    });
  }, []);

  const restart = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev;
      
      historyRef.current.clear();
      
      const parsed = LevelLoader.parseLevel(prev.level);
      if (!parsed.playerPosition) return prev;
      
      return {
        level: prev.level,
        playerPosition: parsed.playerPosition,
        boxes: parsed.boxes,
        targets: parsed.targets,
        steps: 0,
        isWin: false
      };
    });
  }, []);

  const loadLevel = useCallback((id: number) => {
    historyRef.current.clear();
    setCurrentLevelId(id);
    setGameState(initializeLevel(id));
  }, [initializeLevel]);

  const canUndo = historyRef.current.canUndo();

  return {
    gameState,
    move,
    undo,
    canUndo,
    restart,
    loadLevel
  };
};
