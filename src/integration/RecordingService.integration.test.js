// src/integration/RecordingService.integration.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from '../components/RecordingService';

/**
 * Integration tests for the RecordingService component.
 */
describe('RecordingService Integration', () => {
  test('fetches and displays recordings', async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, title: 'Test Recording', date: '2023-10-01' }]),
      })
    );

    render(<RecordingService />);

    // Wait for the recordings to be displayed
    expect(await screen.findByText(/Test Recording/i)).toBeInTheDocument();

    // Clean up mock
    global.fetch.mockClear();
  });

  test('starts and stops recording', async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() => Promise.resolve({}));

    render(<RecordingService />);

    const button = screen.getByText(/Start Recording/i);
    fireEvent.click(button);
    expect(button).toHaveTextContent(/Stop Recording/i);

    fireEvent.click(button);
    expect(button).toHaveTextContent(/Start Recording/i);

    // Clean up mock
    global.fetch.mockClear();
  });
});