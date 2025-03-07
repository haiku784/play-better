// src/tests/Recommendation.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Recommendation from '../components/Recommendation';

/**
 * Mocking the fetch API for testing
 */
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { title: 'Recommendation 1', description: 'Description for recommendation 1' },
      { title: 'Recommendation 2', description: 'Description for recommendation 2' }
    ]),
  })
);

/**
 * Unit tests for the Recommendation component
 */
describe('Recommendation Component', () => {
  test('renders loading state', () => {
    render(<Recommendation />);
    expect(screen.getByText(/Loading recommendations.../i)).toBeInTheDocument();
  });

  test('renders recommendations after fetch', async () => {
    render(<Recommendation />);
    await waitFor(() => expect(screen.getByText(/Recommendations/i)).toBeInTheDocument());
    expect(screen.getByText(/Recommendation 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommendation 2/i)).toBeInTheDocument();
  });

  test('handles fetch error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
    render(<Recommendation />);
    await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
  });
});