import React from 'react';
import { LEVELS } from '@/data/levels';

interface LevelSelectorProps {
  isVisible: boolean;
  unlockedLevels: number[];
  currentLevel: number;
  bestSteps: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  isVisible,
  unlockedLevels,
  currentLevel,
  bestSteps,
  onSelectLevel,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0 }}>选择关卡</h2>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0 10px'
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '15px'
        }}>
          {LEVELS.map(level => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCurrent = level.id === currentLevel;
            const best = bestSteps[level.id];
            
            return (
              <button
                key={level.id}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                disabled={!isUnlocked}
                style={{
                  padding: '15px',
                  border: isCurrent ? '3px solid #2196f3' : '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: isUnlocked ? (isCurrent ? '#e3f2fd' : 'white') : '#f5f5f5',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.5,
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (isUnlocked) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                  关卡 {level.id}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                  {level.name}
                </div>
                {best && (
                  <div style={{ fontSize: '11px', color: '#2196f3', fontWeight: 'bold' }}>
                    最佳: {best} 步
                  </div>
                )}
                {!isUnlocked && (
                  <div style={{ fontSize: '20px', marginTop: '5px' }}>
                    🔒
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
