import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Unit tests for the RecordingService component.
 */
describe('RecordingService', () => {
  test('renders RecordingService component', () => {
    render(<RecordingService />);
    expect(screen.getByText(/Gameplay Recording Service/i)).toBeInTheDocument();
  });

  test('start and stop recording buttons', () => {
    render(<RecordingService />);
    const startButton = screen.getByText(/Start Recording/i);
    const stopButton = screen.getByText(/Stop Recording/i);

    expect(startButton).toBeEnabled();
    expect(stopButton).toBeDisabled();

    fireEvent.click(startButton);
    expect(startButton).toBeDisabled();
    expect(stopButton).toBeEnabled();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordingService from './RecordingService';
import './global.css'; // Import global styles

/**
 * Unit tests for the RecordingService component.
 */
describe('RecordingService', () => {
  test('renders RecordingService component', () => {
    render(<RecordingService />);
    expect(screen.getByText(/Gameplay Recording Service/i)).toBeInTheDocument();
  });

  test('start and stop recording buttons', () => {
    render(<RecordingService />);
    const startButton = screen.getByText(/Start Recording/i);
    const stopButton = screen.getByText(/Stop Recording/i);

    expect(startButton).toBeEnabled();
    expect(stopButton).toBeDisabled();
  });
});