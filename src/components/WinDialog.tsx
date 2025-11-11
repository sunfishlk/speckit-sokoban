interface WinDialogProps {
  steps: number;
  onNextLevel?: () => void;
  onRestart: () => void;
}

export const WinDialog = ({ steps, onNextLevel, onRestart }: WinDialogProps) => {
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
  };

  const dialogStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4169E1',
    color: 'white',
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h2>🎉 恭喜通关！</h2>
        <p>完成步数: {steps}</p>
        <div>
          {onNextLevel && (
            <button style={buttonStyle} onClick={onNextLevel}>
              下一关
            </button>
          )}
          <button style={buttonStyle} onClick={onRestart}>
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
};
