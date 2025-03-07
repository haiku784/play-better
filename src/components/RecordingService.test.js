import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Unit tests for RecordingService component.
 */
describe('RecordingService', () => {
  test('renders RecordingService component', () => {
    render(<RecordingService />);
    expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
  });

  test('starts recording', async () => {
    render(<RecordingService />);
    const startButton = screen.getByText(/Start Recording/i);
    fireEvent.click(startButton);
    // Mock fetch to simulate API response
    expect(await screen.findByText(/Recordings/i)).toBeInTheDocument();
  });

  test('stops recording', async () => {
    render(<RecordingService />);
    const startButton = screen.getByText(/Start Recording/i);
    fireEvent.click(startButton);
    const stopButton = screen.getByText(/Stop Recording/i);
    fireEvent.click(stopButton);
    expect(stopButton).toBeDisabled();
  });
});