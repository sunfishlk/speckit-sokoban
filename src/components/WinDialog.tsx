import React from 'react';

interface WinDialogProps {
  isVisible: boolean;
  steps: number;
  onNextLevel?: () => void;
  onRestart?: () => void;
}

export const WinDialog = ({ isVisible, steps, onNextLevel, onRestart }: WinDialogProps) => {
  if (!isVisible) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out',
  };

  const dialogStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    animation: 'slideIn 0.4s ease-out',
    minWidth: '300px',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '10px',
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#4169E1',
    color: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            transform: translateY(-50px) scale(0.9);
            opacity: 0;
          }
          to { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div style={overlayStyle}>
        <div style={dialogStyle}>
          <h2 style={{ marginBottom: '20px', color: '#4caf50' }}>🎉 恭喜通关！</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>完成步数: {steps}</p>
          <div>
            {onNextLevel && (
              <button 
                style={buttonStyle} 
                onClick={onNextLevel}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2c5aa0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4169E1';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                }}
              >
                下一关
              </button>
            )}
            {onRestart && (
              <button 
                style={{...buttonStyle, backgroundColor: '#ff9800'}} 
                onClick={onRestart}
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
                重新开始
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
