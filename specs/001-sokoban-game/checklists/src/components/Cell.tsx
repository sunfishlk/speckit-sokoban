import React from 'react';
import { CellType } from '../types/game';

interface CellProps {
  type: CellType;
}

export const Cell: React.FC<CellProps> = ({ type }) => {
  const getCellStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: 'bold'
    };

    switch (type) {
      case CellType.Wall:
        return { ...baseStyle, backgroundColor: '#333', color: '#fff' };
      case CellType.Empty:
        return { ...baseStyle, backgroundColor: '#f0f0f0' };
      case CellType.Target:
        return { ...baseStyle, backgroundColor: '#ffe0b2', color: '#ff6f00' };
      case CellType.Box:
        return { ...baseStyle, backgroundColor: '#8d6e63', color: '#fff' };
      case CellType.BoxOnTarget:
        return { ...baseStyle, backgroundColor: '#4caf50', color: '#fff' };
      case CellType.Player:
        return { ...baseStyle, backgroundColor: '#f0f0f0', color: '#2196f3' };
      case CellType.PlayerOnTarget:
        return { ...baseStyle, backgroundColor: '#ffe0b2', color: '#2196f3' };
      default:
        return baseStyle;
    }
  };

  const getCellContent = (): string => {
    switch (type) {
      case CellType.Wall:
        return '█';
      case CellType.Target:
        return '·';
      case CellType.Box:
        return '□';
      case CellType.BoxOnTarget:
        return '■';
      case CellType.Player:
        return '☺';
      case CellType.PlayerOnTarget:
        return '☺';
      default:
        return '';
    }
  };

  return <div style={getCellStyle()}>{getCellContent()}</div>;
};
