import React from 'react';

interface ControlsProps {
  onUndo: () => void;
  onRestart: () => void;
  onOpenLevelSelector?: () => void;
  canUndo: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ 
  onUndo, 
  onRestart, 
  onOpenLevelSelector,
  canUndo 
}) => {
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    }}>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: canUndo ? '#2196f3' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: canUndo ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.2s'
        }}
      >
        ↶ 撤销 (Z)
      </button>
      <button
        onClick={onRestart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ff9800',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        ⟲ 重新开始 (R)
      </button>
      {onOpenLevelSelector && (
        <button
          onClick={onOpenLevelSelector}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          📋 选择关卡
        </button>
      )}
    </div>
  );
};
