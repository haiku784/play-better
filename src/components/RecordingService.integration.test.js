import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Integration tests for RecordingService component.
 */
describe('RecordingService Integration', () => {
  test('fetches and displays recordings', async () => {
    render(<RecordingService />);
    // Mock fetch to simulate API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ sessionId: '1', gameTitle: 'Game A', duration: 120 }]),
      })
    );
    expect(await screen.findByText(/Game A/i)).toBeInTheDocument();
  });

  test('deletes a recording', async () => {
    render(<RecordingService />);
    // Mock fetch to simulate API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ sessionId: '1', gameTitle: 'Game A', duration: 120 }]),
      })
    );
    const deleteButton = await screen.findByText(/Delete/i);
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument(); // Check if the button is removed after deletion
  });
});