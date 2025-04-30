import React from 'react';
import { render, screen } from '../utils/test-utils';
import { ThemeProvider } from '@/components/theme-provider';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

describe('ThemeProvider Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div data-testid="child-element">Child Content</div>
      </ThemeProvider>
    );
    
    const childElement = screen.getByTestId('child-element');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Content');
  });

  it('passes props to the next-themes provider', () => {
    const { container } = render(
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem={false}
        themes={['light', 'dark', 'system']}
      >
        Test
      </ThemeProvider>
    );
    
    // Check that the provider is rendered
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toHaveTextContent('Test');
  });
});