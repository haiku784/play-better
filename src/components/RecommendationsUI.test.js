import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationsUI from './RecommendationsUI';

test('renders recommendations UI', async () => {
    render(<RecommendationsUI userId={1} />);
    // Check for loading state or the presence of expected elements
    const heading = screen.getByText(/recommended players/i);
    expect(heading).toBeInTheDocument();
    // Additional tests can be added to verify player names once the fetch is mocked.
});