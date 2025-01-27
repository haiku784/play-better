import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchDataVisualizationComponent from './MatchDataVisualizationComponent';

test('renders Match Data Visualization Component', () => {
    render(<MatchDataVisualizationComponent />);
    const buttonElement = screen.getByText(/Generate Visualization/i);
    expect(buttonElement).toBeInTheDocument();
});

test('handles form submission', async () => {
    render(<MatchDataVisualizationComponent />);
    fireEvent.change(screen.getByPlaceholderText(/Match ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText(/Visualization Type/i), { target: { value: 'bar chart' } });
    fireEvent.click(screen.getByText(/Generate Visualization/i));
    expect(await screen.findByText(/Generating Visualization/i)).toBeInTheDocument();
});
