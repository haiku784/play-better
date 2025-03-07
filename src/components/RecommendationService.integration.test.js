import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecommendationService from './RecommendationService';

/**
 * Integration tests for the RecommendationService component.
 */
describe('RecommendationService Integration', () => {
  beforeEach(() => {
    // Mock the fetch API to return sample data
    global.fetch = jest.fn((url) => {
      if (url === '/hardware-recommendations') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ hardwareId: '1', type: 'GPU', compatibilityDetails: 'Compatible with most systems', purchaseLinks: 'http://example.com' }]),
        });
      }
      if (url === '/config-recommendations') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ gameTitle: 'Game A', sensitivitySettings: 'Low', graphicsSettings: 'High' }]),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetches and displays hardware and configuration recommendations', async () => {
    render(<RecommendationService />);

    // Wait for the hardware recommendation to appear
    await waitFor(() => {
      expect(screen.getByText(/GPU/i)).toBeInTheDocument();
      expect(screen.getByText(/Compatible with most systems/i)).toBeInTheDocument();
    });

    // Wait for the configuration recommendation to appear
    await waitFor(() => {
      expect(screen.getByText(/Game A/i)).toBeInTheDocument();
      expect(screen.getByText(/Low/i)).toBeInTheDocument();
      expect(screen.getByText(/High/i)).toBeInTheDocument();
    });
  });
});