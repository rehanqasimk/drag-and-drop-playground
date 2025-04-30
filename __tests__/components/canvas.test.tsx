import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import Canvas from '@/components/canvas';
import { PlaygroundElement } from '@/lib/types';

// Types for mocked element components
interface MockElementProps {
  element: PlaygroundElement;
  isSelected: boolean;
  onSelect: () => void;
}

// Mock react-dnd hooks
jest.mock('react-dnd', () => ({
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

// Mock the element components separately
jest.mock('@/components/elements/text-element', () => ({
  __esModule: true,
  default: ({ element, isSelected, onSelect }: MockElementProps) => (
    <div 
      data-testid="text-element" 
      data-id={element.id}
      className={isSelected ? 'selected' : ''} 
      onClick={onSelect}
    >
      {element.properties.content || 'Text'}
    </div>
  )
}));

jest.mock('@/components/elements/image-element', () => ({
  __esModule: true,
  default: ({ element, isSelected, onSelect }: MockElementProps) => (
    <div 
      data-testid="image-element" 
      data-id={element.id}
      className={isSelected ? 'selected' : ''} 
      onClick={onSelect}
    >
      Image
    </div>
  )
}));

jest.mock('@/components/elements/shape-element', () => ({
  __esModule: true,
  default: ({ element, isSelected, onSelect }: MockElementProps) => (
    <div 
      data-testid="shape-element" 
      data-id={element.id}
      className={isSelected ? 'selected' : ''} 
      onClick={onSelect}
    >
      Shape
    </div>
  )
}));

describe('Canvas Component', () => {
  const mockElements: PlaygroundElement[] = [
    { id: '1', type: 'text', x: 10, y: 10, width: 100, height: 50, properties: { text: 'Hello' } },
    { id: '2', type: 'image', x: 120, y: 10, width: 200, height: 150, properties: { src: '/test.jpg' } },
    { id: '3', type: 'shape', x: 50, y: 200, width: 80, height: 80, properties: { shape: 'circle' } },
  ];

  const mockProps = {
    elements: mockElements,
    selectedElementId: null,
    onElementSelect: jest.fn(),
    onElementMove: jest.fn(),
    onElementResize: jest.fn(),
    onElementDelete: jest.fn(),
    onDrop: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with elements', () => {
    render(<Canvas {...mockProps} />);
    
    expect(screen.getByTestId('text-element')).toBeInTheDocument();
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
    expect(screen.getByTestId('shape-element')).toBeInTheDocument();
  });

  it('selects an element when clicked', () => {
    render(<Canvas {...mockProps} />);
    
    fireEvent.click(screen.getByTestId('text-element'));
    expect(mockProps.onElementSelect).toHaveBeenCalledWith('1');
  });

  it('renders selected element with selected class', () => {
    render(<Canvas {...{ ...mockProps, selectedElementId: '2' }} />);
    
    const textElement = screen.getByTestId('text-element');
    const imageElement = screen.getByTestId('image-element');
    
    expect(textElement).not.toHaveClass('selected');
    expect(imageElement).toHaveClass('selected');
  });
});