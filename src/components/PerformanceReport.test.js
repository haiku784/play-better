import React from 'react';
import { render, screen } from '@testing-library/react';
import PerformanceReport from './PerformanceReport';

/**
 * Unit tests for the PerformanceReport component to ensure it renders correctly
 * and adheres to user testing feedback for clarity and understanding.
 */
describe('PerformanceReport', () => {
    it('renders the Performance Report heading', () => {
        render(<PerformanceReport metrics={{ graphData: [], tableData: [] }} />);
        expect(screen.getByText(/Performance Report/i)).toBeInTheDocument();
    });

    it('renders a graph component', () => {
        render(<PerformanceReport metrics={{ graphData: [], tableData: [] }} />);
        expect(screen.getByRole('img')).toBeInTheDocument(); // Assuming a canvas is rendered as img
    });

    it('renders a table with metrics', () => {
        const sampleMetrics = {
            graphData: [],
            tableData: [
                { name: 'Metric 1', value: 100 },
                { name: 'Metric 2', value: 200 },
            ],
        };
        render(<PerformanceReport metrics={sampleMetrics} />);
        expect(screen.getByText('Metric 1')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
    });
});