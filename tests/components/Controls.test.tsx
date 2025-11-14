import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Controls } from '@/components/Controls';

describe('Controls', () => {
  it('should render undo and restart buttons', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    
    render(<Controls onUndo={mockUndo} onRestart={mockRestart} canUndo={true} />);
    
    expect(screen.getByText(/撤销/)).toBeInTheDocument();
    expect(screen.getByText(/重新开始/)).toBeInTheDocument();
  });

  it('should call onUndo when undo button clicked', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    
    render(<Controls onUndo={mockUndo} onRestart={mockRestart} canUndo={true} />);
    
    const undoButton = screen.getByText(/撤销/);
    fireEvent.click(undoButton);
    
    expect(mockUndo).toHaveBeenCalledTimes(1);
  });

  it('should call onRestart when restart button clicked', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    
    render(<Controls onUndo={mockUndo} onRestart={mockRestart} canUndo={true} />);
    
    const restartButton = screen.getByText(/重新开始/);
    fireEvent.click(restartButton);
    
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });

  it('should disable undo button when canUndo is false', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    
    render(<Controls onUndo={mockUndo} onRestart={mockRestart} canUndo={false} />);
    
    const undoButton = screen.getByText(/撤销/) as HTMLButtonElement;
    expect(undoButton.disabled).toBe(true);
  });

  it('should enable undo button when canUndo is true', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    
    render(<Controls onUndo={mockUndo} onRestart={mockRestart} canUndo={true} />);
    
    const undoButton = screen.getByText(/撤销/) as HTMLButtonElement;
    expect(undoButton.disabled).toBe(false);
  });

  it('should render level selector button when callback provided', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    const mockOpenSelector = vi.fn();
    
    render(
      <Controls 
        onUndo={mockUndo} 
        onRestart={mockRestart} 
        onOpenLevelSelector={mockOpenSelector}
        canUndo={true} 
      />
    );
    
    expect(screen.getByText(/选择关卡/)).toBeInTheDocument();
  });

  it('should call onOpenLevelSelector when level selector button clicked', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    const mockOpenSelector = vi.fn();
    
    render(
      <Controls 
        onUndo={mockUndo} 
        onRestart={mockRestart} 
        onOpenLevelSelector={mockOpenSelector}
        canUndo={true} 
      />
    );
    
    const selectorButton = screen.getByText(/选择关卡/);
    fireEvent.click(selectorButton);
    
    expect(mockOpenSelector).toHaveBeenCalledTimes(1);
  });

  it('should not render level selector button when callback not provided', () => {
    const mockUndo = vi.fn();
    const mockRestart = vi.fn();
    
    render(<Controls onUndo={mockUndo} onRestart={mockRestart} canUndo={true} />);
    
    expect(screen.queryByText(/选择关卡/)).not.toBeInTheDocument();
  });
});
