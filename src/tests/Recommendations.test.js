// src/tests/Recommendations.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Recommendations from '../components/Recommendations';

/**
 * Unit tests for Recommendations component.
 */
describe('Recommendations Component', () => {
  test('renders loading state', () => {
    render(<Recommendations />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders recommendations when data is fetched', async () => {
    render(<Recommendations />);
    const listElement = await screen.findByRole('list');
    expect(listElement).toBeInTheDocument();
  });
});