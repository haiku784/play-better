// src/tests/RecordingList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordingList from '../components/RecordingList';

/**
 * Unit tests for RecordingList component.
 */
describe('RecordingList Component', () => {
  test('renders loading state', () => {
    render(<RecordingList />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders recordings when data is fetched', async () => {
    render(<RecordingList />);
    const listElement = await screen.findByRole('list');
    expect(listElement).toBeInTheDocument();
  });
});