import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Integration tests for the RecordingService component.
 */
describe('RecordingService Integration', () => {
  test('fetches and displays gameplay sessions', async () => {
    render(<RecordingService />);

    // Mocking the fetch API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ sessionId: '1', gameTitle: 'Game A', recordingData: {} }]),
      })
    );

    await waitFor(() => expect(screen.getByText(/Game A/i)).toBeInTheDocument());
  });

  test('deletes a gameplay session', async () => {
    render(<RecordingService />);

    // Mocking the fetch API response
    global.fetch = jest.fn((url, options) => {
      if (options.method === 'DELETE') {
        return Promise.resolve({});
      }
      return Promise.resolve({
        json: () => Promise.resolve([{ sessionId: '1', gameTitle: 'Game A', recordingData: {} }]),
      });
    });

    await waitFor(() => expect(screen.getByText(/Game A/i)).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => expect(screen.queryByText(/Game A/i)).not.toBeInTheDocument());
  });
});