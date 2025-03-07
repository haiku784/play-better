import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App'; // Assuming App is the main component that includes all others

/**
 * Global Integration Tests
 * This file contains integration tests for the overall application.
 */
describe('App Integration Tests', () => {
  test('renders the main application without crashing', () => {
    render(<App />);
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/User Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/User Notifications/i)).toBeInTheDocument();
  });
});