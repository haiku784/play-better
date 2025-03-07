/**
 * Recommendation Component Tests
 * This file contains unit and integration tests for the Recommendation component.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Recommendation from './Recommendation';

/**
 * Mocking the fetch function to simulate API calls.
 */
global.fetch = jest.fn();

describe('Recommendation Component', () => {
  const userId = 1;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<Recommendation userId={userId} />);
    expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
  });

  test('displays recommendations on successful fetch', async () => {
    const mockRecommendations = [{ recommendationId: 1, hardwareRecommendations: 'New GPU', configRecommendations: 'High Settings' }];
    fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockRecommendations) });

    render(<Recommendation userId={userId} />);

    const listItem = await screen.findByText(/New GPU/i);
    expect(listItem).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<Recommendation userId={userId} />);

    const errorMessage = await screen.findByText(/Error: Failed to fetch recommendations/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('refresh button fetches recommendations again', async () => {
    const mockRecommendations = [{ recommendationId: 1, hardwareRecommendations: 'New GPU', configRecommendations: 'High Settings' }];
    fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockRecommendations) });

    render(<Recommendation userId={userId} />);
    await screen.findByText(/New GPU/i);

    fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce([]) });
    fireEvent.click(screen.getByText(/Refresh Recommendations/i));

    const emptyMessage = await screen.findByText(/No recommendations available/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});