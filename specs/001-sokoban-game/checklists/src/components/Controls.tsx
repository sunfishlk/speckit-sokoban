import React from 'react';

interface ControlsProps {
  onUndo: () => void;
  canUndo: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onUndo, canUndo }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    }}>
      <button
        onClick={onUndo}
        disabled={\!canUndo}
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
    </div>
  );
};
