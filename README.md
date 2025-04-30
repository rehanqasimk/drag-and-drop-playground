# Design Playground

![Design Playground Logo](/public/design-playground-icon.svg)

A drag-and-drop interface for creating and customizing layouts with various elements like text, images, and shapes.

## Features

- Interactive drag-and-drop functionality
- Support for text, image, and shape elements
- Custom properties panel for editing elements
- Real-time visual feedback
- Save and load functionality
- Responsive design

## Prerequisites

- Node.js 18.x or higher
- npm

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone <repository-url>
cd drag-and-drop-playground
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

This project uses Jest and React Testing Library for testing.

### Running Tests

Various test commands are available to run tests in different modes:

#### Run all tests

```bash
npm test
```

#### Run tests in watch mode (development)

```bash
npm run test:watch
```

This will re-run tests automatically when files change, making it ideal for development.

#### Run specific test files

```bash
npm test -- components/canvas.test.tsx
```

#### Run tests matching a specific pattern

```bash
npm test -- -t "should render sidebar elements"
```

#### Run tests for a specific component or directory

```bash
npm test -- canvas
npm test -- components/elements
```

#### Generate test coverage reports

```bash
npm run test:coverage
```

### Test Configuration

The project uses Jest with the following configuration:

- **Test Environment**: JSDOM (browser-like environment)
- **Setup File**: `jest.setup.ts` configures common mocks including:
  - `window.matchMedia` for responsive design testing
  - `next/navigation` hooks for route testing
- **Custom Test Utilities**: Located in `__tests__/utils/test-utils.tsx`

### Debugging Tests

You can debug tests in VS Code by:

1. Setting breakpoints in your test files
2. Using the JavaScript Debug Terminal
3. Running `npm test:debug` to launch tests with the debugger attached

For more verbose output, use:

```bash
npm test -- --verbose
```

### Test Coverage

The project maintains test coverage across multiple components and utilities:

| Category | Coverage |
|----------|----------|
| Components | Core components including Canvas, Sidebar, and Theme Provider |
| Elements | Text, Shape, and Image elements with draggable functionality |
| UI Components | Button and other UI primitives |
| Utilities | Helper functions in `/lib` |

#### Coverage Reports

Coverage reports are generated in the `coverage` directory with the following formats:
- HTML report: `coverage/lcov-report/index.html` (open in browser for interactive view)
- lcov: `coverage/lcov.info` (for CI integration)
- JSON: `coverage/coverage-final.json` (for custom tooling)
- Clover XML: `coverage/clover.xml` (for CI/CD systems)

##### Viewing Coverage Reports

To view the HTML coverage report:

```bash
# Generate the report
npm run test:coverage

# Open the report in your default browser (macOS)
open coverage/lcov-report/index.html
```

The report provides detailed metrics including:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

#### Test Structure

Tests are organized to mirror the application structure:
- `__tests__/components/` - Component tests
  - `canvas.test.tsx` - Tests for Canvas component
  - `sidebar.test.tsx` - Tests for Sidebar component
  - `theme-provider.test.tsx` - Tests for Theme Provider
  - `elements/` - Tests for draggable elements
    - `shape-element.test.tsx` - Shape element tests
    - `text-element.test.tsx` - Text element tests
  - `ui/` - UI component tests
    - `button.test.tsx` - Button component tests
- `__tests__/lib/` - Utility function tests
  - `utils.test.ts` - Tests for utility functions
- `__tests__/utils/` - Test helpers
  - `test-utils.tsx` - Custom render functions and test utilities

#### Test Utilities

Custom test utilities are available in `__tests__/utils/test-utils.tsx` to help with:
- Setting up providers (DnD, theme)
- Mock implementations
- Custom render functions

#### Writing New Tests

When writing new tests, follow these conventions:

1. Create test files that match the structure and naming of your source files
2. Use the custom render utilities from `test-utils.tsx`
3. Mock external dependencies and browser APIs as needed
4. Write tests that focus on component behavior and user interactions
5. Avoid testing implementation details

## Build for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```