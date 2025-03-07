import React from 'react';
import { render, screen } from '@testing-library/react';
import Analysis from './Analysis';

/**
 * Unit tests for the Analysis component.
 */
describe('Analysis Component', () => {
  test('renders loading state', () => {
    render(<Analysis />);
    const loadingElement = screen.getByText(/Loading analysis.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders error message', () => {
    // Mocking fetch to simulate an error response
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    render(<Analysis />);
    expect(screen.getByText(/Error: API is down/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Analysis from './Analysis';
import './global.css'; // Import global styles

/**
 * Unit tests for the Analysis component.
 */
describe('Analysis Component', () => {
  test('renders loading state', () => {
    render(<Analysis />);
    const loadingElement = screen.getByText(/Loading analysis.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders error message', () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    render(<Analysis />);
    expect(screen.getByText(/Error: API is down/i)).toBeInTheDocument();
  });
});