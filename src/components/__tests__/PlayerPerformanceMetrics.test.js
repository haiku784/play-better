import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerPerformanceMetrics from './PlayerPerformanceMetrics';

// Unit tests for PlayerPerformanceMetrics component

describe('PlayerPerformanceMetrics', () => {
    it('renders without crashing', () => {
        render(<PlayerPerformanceMetrics />);
    });

    it('validates inputs correctly', () => {
        const { getByPlaceholderText, getByText } = render(<PlayerPerformanceMetrics />);
        fireEvent.change(getByPlaceholderText('Player ID'), { target: { value: '123' } });
        fireEvent.change(getByPlaceholderText('Match Data (JSON Array)'), { target: { value: '[{}]' } });
        fireEvent.click(getByText('Calculate Metrics'));
        // Check if validation worked and metrics were calculated
    });
});