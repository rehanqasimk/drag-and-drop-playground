import React from 'react';
import { render, screen } from '../utils/test-utils';
import Sidebar from '@/components/sidebar';
import { ElementType } from '@/lib/types';

// Mock react-dnd hooks
jest.mock('react-dnd', () => ({
  useDrag: () => [
    { isDragging: false },
    jest.fn(),
  ],
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Square: () => <div data-testid="square-icon" />,
  Type: () => <div data-testid="type-icon" />,
  ImageIcon: () => <div data-testid="image-icon" />,
}));

describe('Sidebar Component', () => {
  const mockProps = {
    onDrop: jest.fn(),
    canvasRef: { current: document.createElement('div') },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sidebar title and instructions', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByText('Elements')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop elements onto the canvas')).toBeInTheDocument();
  });

  it('renders all three draggable element types', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Shape')).toBeInTheDocument();
    
    // Check icons are rendered
    expect(screen.getByTestId('type-icon')).toBeInTheDocument();
    expect(screen.getByTestId('image-icon')).toBeInTheDocument();
    expect(screen.getByTestId('square-icon')).toBeInTheDocument();
  });

  it('renders the how-to-use section', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByText('How to use')).toBeInTheDocument();
    expect(screen.getByText('Drag elements from sidebar to canvas')).toBeInTheDocument();
    expect(screen.getByText('Click on elements to select and edit properties')).toBeInTheDocument();
    expect(screen.getByText('Drag elements on canvas to reposition')).toBeInTheDocument();
    expect(screen.getByText('Use the properties panel to customize elements')).toBeInTheDocument();
  });
});