import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchDataVisualizationComponent from './MatchDataVisualizationComponent';

test('renders MatchDataVisualizationComponent', () => {
    render(<MatchDataVisualizationComponent />);
    expect(screen.getByText(/Match Data Visualization/i)).toBeInTheDocument();
});

test('handles input and fetch visualization', async () => {
    render(<MatchDataVisualizationComponent />);
    fireEvent.change(screen.getByPlaceholderText(/Match ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText(/Visualization Type/i), { target: { value: 'bar chart' } });
    fireEvent.click(screen.getByText(/Generate Visualization/i));
    // Mocking fetch would go here, asserting results would be next.
});