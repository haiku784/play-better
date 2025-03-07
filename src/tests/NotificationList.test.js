// src/tests/NotificationList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotificationList from '../components/NotificationList';

/**
 * Mocking the fetch API for testing.
 */
global.fetch = jest.fn();

describe('NotificationList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(<NotificationList />);
    expect(screen.getByText(/Loading notifications.../i)).toBeInTheDocument();
  });

  test('renders notifications', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, message: 'New gear available!', timestamp: Date.now() }],
    });

    render(<NotificationList />);

    await waitFor(() => {
      expect(screen.getByText(/New gear available!/i)).toBeInTheDocument();
    });
  });

  test('renders error message', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<NotificationList />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});

// src/tests/NotificationList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationList from '../components/NotificationList';

/**
 * Unit tests for NotificationList component.
 */
describe('NotificationList Component', () => {
  test('renders loading state', () => {
    render(<NotificationList />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders notifications when data is fetched', async () => {
    render(<NotificationList />);
    const listElement = await screen.findByRole('list');
    expect(listElement).toBeInTheDocument();
  });
});