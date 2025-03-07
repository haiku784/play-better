import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationService from './RecommendationService';

/**
 * Unit tests for the RecommendationService component.
 */
describe('RecommendationService', () => {
  test('renders hardware and configuration recommendations', async () => {
    render(<RecommendationService />);

    // Check if the headings are in the document
    expect(screen.getByText(/Hardware Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Configuration Recommendations/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationService from './RecommendationService';
import './global.css'; // Import global styles

/**
 * Unit tests for the RecommendationService component.
 */
describe('RecommendationService', () => {
  test('renders hardware and configuration recommendations', async () => {
    render(<RecommendationService />);
    expect(screen.getByText(/Hardware Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Configuration Recommendations/i)).toBeInTheDocument();
  });
});