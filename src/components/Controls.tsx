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
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => {
          if (canUndo) {
            e.currentTarget.style.backgroundColor = '#1976d2';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (canUndo) {
            e.currentTarget.style.backgroundColor = '#2196f3';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          }
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
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f57c00';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ff9800';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
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
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#388e3c';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4caf50';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          }}
        >
          📋 选择关卡
        </button>
      )}
    </div>
  );
};
