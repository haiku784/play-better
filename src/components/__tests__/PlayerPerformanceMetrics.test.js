import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerPerformanceMetrics from './PlayerPerformanceMetrics';

// Test suite for PlayerPerformanceMetrics component
describe('PlayerPerformanceMetrics Component', () => {
    test('renders input fields and calculates metrics', () => {
        render(<PlayerPerformanceMetrics />);
        const playerIdInput = screen.getByPlaceholderText(/Player ID/i);
        const matchDataInput = screen.getByPlaceholderText(/Match Data/i);
        const calculateButton = screen.getByRole('button', { name: /Calculate Metrics/i });

        // Simulate user input
        fireEvent.change(playerIdInput, { target: { value: 'player123' } });
        fireEvent.change(matchDataInput, { target: { value: '1,2,3' } });

        // Simulate button click
        fireEvent.click(calculateButton);

        // Check if metrics are displayed
        const metricsDisplay = screen.getByText(/Performance Metrics for player123/i);
        expect(metricsDisplay).toBeInTheDocument();
    });
});