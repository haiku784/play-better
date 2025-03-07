import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * Unit tests for the App component to ensure routing works correctly.
 */
describe('App Component', () => {
  test('renders UserService component on root path', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  });

  test('renders RecordingService component on /recording path', () => {
    render(
      <MemoryRouter initialEntries={["/recording"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Gameplay Recording Service/i)).toBeInTheDocument();
  });

  test('renders Analysis component on /analysis path', () => {
    render(
      <MemoryRouter initialEntries={["/analysis"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Gameplay Analysis Results/i)).toBeInTheDocument();
  });

  test('renders NotFound component for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});