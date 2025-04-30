import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import TextElement from '@/components/elements/text-element';
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

describe('TextElement Component', () => {
  const mockElement: PlaygroundElement = {
    id: '1',
    type: 'text',
    x: 10,
    y: 20,
    width: 200,
    height: 100,
    properties: {
      fontFamily: 'Arial',
      fontSize: 16,
      bold: true,
      italic: false,
      underline: true,
      content: 'Test text content'
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

  it('renders with correct text content', () => {
    render(<TextElement {...mockProps} />);
    expect(screen.getByText('Test text content')).toBeInTheDocument();
  });

  it('positions element correctly based on x, y coordinates', () => {
    const { container } = render(<TextElement {...mockProps} />);
    
    // Use container.firstChild as it's the outer div with position styles
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveStyle({
      left: '10px',
      top: '20px',
      width: '200px',
      height: '100px',
    });
  });

  it('applies correct text styles', () => {
    render(<TextElement {...mockProps} />);
    
    // Get the inner div that contains the text content
    const textDiv = screen.getByText('Test text content');
    expect(textDiv).toHaveStyle({
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      textDecoration: 'underline',
    });
  });

  it('calls onSelect when clicked', () => {
    render(<TextElement {...mockProps} />);
    
    fireEvent.click(screen.getByText('Test text content'));
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it('shows outline, resize handle and delete button when selected', () => {
    const { container } = render(<TextElement {...{...mockProps, isSelected: true}} />);
    
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
    render(<TextElement {...{...mockProps, isSelected: true}} />);
    
    // Find the delete button container
    const deleteButton = document.querySelector('.hover\\:bg-red-100');
    fireEvent.click(deleteButton!);
    
    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });
});