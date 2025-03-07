// src/components/RecordingService.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Unit tests for the RecordingService component.
 */
describe('RecordingService', () => {
  test('renders RecordingService component', () => {
    render(<RecordingService />);
    expect(screen.getByText(/Recording Service/i)).toBeInTheDocument();
  });

  test('shows start recording button initially', () => {
    render(<RecordingService />);
    expect(screen.getByText(/Start Recording/i)).toBeInTheDocument();
  });

  test('changes button text to Stop Recording when clicked', () => {
    render(<RecordingService />);
    const button = screen.getByText(/Start Recording/i);
    fireEvent.click(button);
    expect(screen.getByText(/Stop Recording/i)).toBeInTheDocument();
  });
});