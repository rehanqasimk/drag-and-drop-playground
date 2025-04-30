import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import ShapeElement from '@/components/elements/shape-element';
import { PlaygroundElement } from '@/lib/types';

// Mock react-dnd hooks
jest.mock('react-dnd', () => ({
  useDrag: () => [
    { isDragging: false },
    jest.fn(),
  ],
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Trash2: () => <div data-testid="trash-icon" />,
}));

describe('ShapeElement Component', () => {
  const mockElement: PlaygroundElement = {
    id: '1',
    type: 'shape',
    x: 10,
    y: 20,
    width: 200,
    height: 100,
    properties: {
      path: 'M 0,0 L 100,0 L 100,100 L 0,100 Z', // Simple rectangle path
      shape: 'rectangle'
    }
  };

  const mockProps = {
    element: mockElement,
    isSelected: false,
    onSelect: jest.fn(),
    onMove: jest.fn(),
    onResize: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders shape with correct SVG path', () => {
    const { container } = render(<ShapeElement {...mockProps} />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', 'M 0,0 L 100,0 L 100,100 L 0,100 Z');
  });

  it('positions element correctly based on x, y coordinates', () => {
    const { container } = render(<ShapeElement {...mockProps} />);
    
    // Use container.firstChild as it's the outer div with position styles
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveStyle({
      left: '10px',
      top: '20px',
      width: '200px',
      height: '100px',
    });
  });

  it('calls onSelect when clicked', () => {
    const { container } = render(<ShapeElement {...mockProps} />);
    
    // Get the outermost container and click it
    const outerDiv = container.firstChild as HTMLElement;
    fireEvent.click(outerDiv);
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it('shows resize handle and delete button when selected', () => {
    const { container } = render(<ShapeElement {...{...mockProps, isSelected: true}} />);
    
    // The outer element should have an outline when selected
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('outline outline-2 outline-blue-500');
    
    // Check for delete button with trash icon
    const trashIcon = screen.getByTestId('trash-icon');
    expect(trashIcon).toBeInTheDocument();
    
    // Check for resize handle - the blue dot in the corner
    const resizeHandle = document.querySelector('.cursor-se-resize');
    expect(resizeHandle).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<ShapeElement {...{...mockProps, isSelected: true}} />);
    
    // Find the delete button container
    const deleteButton = document.querySelector('.hover\\:bg-red-100');
    fireEvent.click(deleteButton!);
    
    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });
});