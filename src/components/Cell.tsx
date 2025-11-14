import { CellType } from '@/types/game';

interface CellProps {
  type: CellType;
  testId?: string;
}

export const Cell = ({ type, testId }: CellProps) => {
  const cellStyles: Record<CellType, React.CSSProperties> = {
    [CellType.Wall]: {
      backgroundColor: '#333',
      border: '1px solid #222',
    },
    [CellType.Empty]: {
      backgroundColor: '#f0f0f0',
      border: '1px solid #ddd',
    },
    [CellType.Target]: {
      backgroundColor: '#ffffcc',
      border: '1px solid #ffcc00',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [CellType.Box]: {
      backgroundColor: '#8B4513',
      border: '1px solid #654321',
      borderRadius: '4px',
    },
    [CellType.BoxOnTarget]: {
      backgroundColor: '#228B22',
      border: '1px solid #006400',
      borderRadius: '4px',
    },
    [CellType.Player]: {
      backgroundColor: '#4169E1',
      border: '1px solid #000080',
      borderRadius: '50%',
    },
    [CellType.PlayerOnTarget]: {
      backgroundColor: '#9370DB',
      border: '1px solid #4B0082',
      borderRadius: '50%',
    },
  };

  const baseStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
    ...cellStyles[type],
  };

  const getIcon = () => {
    switch (type) {
      case CellType.Player:
      case CellType.PlayerOnTarget:
        return '👨';
      case CellType.Box:
      case CellType.BoxOnTarget:
        return '📦';
      case CellType.Target:
        return '🎯';
      default:
        return '';
    }
  };

  return (
    <div style={baseStyle} data-testid={testId}>
      <span style={{ fontSize: '20px' }}>{getIcon()}</span>
    </div>
  );
};
