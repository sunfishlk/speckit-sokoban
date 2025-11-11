import { useState, useCallback } from 'react';
import { SaveData } from '@/types/game';
import { loadSaveData, saveSaveData } from '@/utils/storage';
import { DEFAULT_SAVE_DATA } from '@/data/levels';

export const useLocalStorage = () => {
  const [saveData, setSaveData] = useState<SaveData>(() => {
    const loaded = loadSaveData();
    return loaded || DEFAULT_SAVE_DATA;
  });

  const updateSaveData = useCallback((updates: Partial<SaveData>) => {
    setSaveData(prev => {
      const newData = { ...prev, ...updates };
      saveSaveData(newData);
      return newData;
    });
  }, []);

  const unlockLevel = useCallback((levelId: number) => {
    setSaveData(prev => {
      if (prev.unlockedLevels.includes(levelId)) {
        return prev;
      }
      const newData = {
        ...prev,
        unlockedLevels: [...prev.unlockedLevels, levelId].sort((a, b) => a - b)
      };
      saveSaveData(newData);
      return newData;
    });
  }, []);

  const updateBestSteps = useCallback((levelId: number, steps: number) => {
    setSaveData(prev => {
      const currentBest = prev.bestSteps[levelId];
      if (currentBest !== undefined && currentBest <= steps) {
        return prev;
      }
      const newData = {
        ...prev,
        bestSteps: { ...prev.bestSteps, [levelId]: steps }
      };
      saveSaveData(newData);
      return newData;
    });
  }, []);

  const setCurrentLevel = useCallback((levelId: number) => {
    setSaveData(prev => {
      const newData = { ...prev, currentLevel: levelId };
      saveSaveData(newData);
      return newData;
    });
  }, []);

  return {
    saveData,
    updateSaveData,
    unlockLevel,
    updateBestSteps,
    setCurrentLevel
  };
};
