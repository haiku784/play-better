// src/tests/PerformanceMetrics.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PerformanceMetrics from '../components/PerformanceMetrics';

/**
 * Unit tests for PerformanceMetrics component.
 */
describe('PerformanceMetrics Component', () => {
  test('renders loading state', () => {
    render(<PerformanceMetrics />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders performance metrics when data is fetched', async () => {
    render(<PerformanceMetrics />);
    const listElement = await screen.findByRole('list');
    expect(listElement).toBeInTheDocument();
  });
});