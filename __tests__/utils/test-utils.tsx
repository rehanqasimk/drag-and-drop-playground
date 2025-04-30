import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Using a simple wrapper for now to avoid ThemeProvider issues
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };