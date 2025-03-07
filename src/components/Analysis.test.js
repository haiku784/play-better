/**
 * Analysis Component Tests
 * This file contains unit tests for the Analysis component using Jest and React Testing Library.
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analysis from './Analysis';

// Mocking the fetch function globally
global.fetch = jest.fn();

describe('Analysis Component', () => {
  const sessionId = '123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<Analysis sessionId={sessionId} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders performance metrics on successful fetch', async () => {
    const mockMetrics = [{ metricId: 1, kills: 10, deaths: 2, assists: 5, accuracy: 75 }];
    fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockMetrics) });

    render(<Analysis sessionId={sessionId} />);

    await waitFor(() => {
      expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument();
      expect(screen.getByText(/10/i)).toBeInTheDocument();
      expect(screen.getByText(/2/i)).toBeInTheDocument();
      expect(screen.getByText(/5/i)).toBeInTheDocument();
      expect(screen.getByText(/75%/i)).toBeInTheDocument();
    });
  });

  test('renders error message on failed fetch', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<Analysis sessionId={sessionId} />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});