import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analysis from './Analysis';

/**
 * Integration tests for the Analysis component.
 */
describe('Analysis Component Integration', () => {
  test('fetches and displays analysis data', async () => {
    // Mocking fetch to return a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ kills: 10, deaths: 5, assists: 3, accuracy: 75 }),
      })
    );

    render(<Analysis />);

    // Wait for the analysis data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Kills: 10/i)).toBeInTheDocument();
      expect(screen.getByText(/Deaths: 5/i)).toBeInTheDocument();
      expect(screen.getByText(/Assists: 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Accuracy: 75%/i)).toBeInTheDocument();
    });
  });
});