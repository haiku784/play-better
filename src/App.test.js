import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * Unit tests for App component routing.
 */
describe('App Component', () => {
  test('renders RecordingService on root path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/Recording Service/i)).toBeInTheDocument();
  });

  test('renders Analysis component for /analysis/:sessionId path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/analysis/123"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/Performance Metrics/i)).toBeInTheDocument();
  });

  test('renders Recommendation component for /recommendations/:userId path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/recommendations/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/User Recommendations/i)).toBeInTheDocument();
  });

  test('renders UserManagement component for /users path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/users"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/User Management/i)).toBeInTheDocument();
  });

  test('renders NotificationService component for /notifications path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/notifications"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/User Notifications/i)).toBeInTheDocument();
  });

  test('renders NotFound component for unmatched routes', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});