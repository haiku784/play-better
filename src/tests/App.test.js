// src/tests/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

/**
 * Unit tests for App component routing.
 */
describe('App Component', () => {
  test('renders RecordingList component', () => {
    render(
      <MemoryRouter initialEntries={["/recordings"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recordings/i)).toBeInTheDocument();
  });

  test('renders PerformanceMetrics component', () => {
    render(
      <MemoryRouter initialEntries={["/performance-metrics"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument();
  });

  test('renders Recommendations component', () => {
    render(
      <MemoryRouter initialEntries={["/recommendations"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recommendations/i)).toBeInTheDocument();
  });

  test('renders UserProfile component', () => {
    render(
      <MemoryRouter initialEntries={["/user-profile"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
  });

  test('renders NotificationList component', () => {
    render(
      <MemoryRouter initialEntries={["/notifications"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});