import React from 'react';

interface WinDialogProps {
  isVisible: boolean;
  steps: number;
  onClose?: () => void;
}

export const WinDialog: React.FC<WinDialogProps> = ({ isVisible, steps, onClose }) => {
  if (\!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#4caf50', marginBottom: '20px' }}>🎉 恭喜通关！</h2>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          你用了 <strong>{steps}</strong> 步完成关卡
        </p>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            关闭
          </button>
        )}
      </div>
    </div>
  );
};
