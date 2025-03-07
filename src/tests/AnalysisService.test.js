// src/tests/AnalysisService.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AnalysisService from '../components/AnalysisService';

/**
 * Mock fetch function to simulate API response.
 */
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'K/D Ratio', value: '2.5' }, { id: 2, name: 'Win Rate', value: '75%' }]),
  })
);

/**
 * Unit test for AnalysisService component.
 */
describe('AnalysisService', () => {
  test('renders performance metrics', async () => {
    render(<AnalysisService />);

    // Wait for the metrics to be displayed
    await waitFor(() => {
      expect(screen.getByText(/K"/D Ratio:/)).toBeInTheDocument();
      expect(screen.getByText(/Win Rate:/)).toBeInTheDocument();
    });
  });

  test('handles error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
    render(<AnalysisService />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});