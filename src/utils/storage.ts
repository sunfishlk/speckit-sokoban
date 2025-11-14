import { SaveData } from '../types/game';

const STORAGE_KEY = 'sokoban-save-data';

export const loadSaveData = (): SaveData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load save data:', error);
    return null;
  }
};

export const saveSaveData = (data: SaveData): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save data:', error);
    return false;
  }
};

export const clearSaveData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear save data:', error);
  }
};
