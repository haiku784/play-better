import React from 'react';
import { render } from '@testing-library/react';
import PerformanceMetricsDisplay from './PerformanceMetricsDisplay';

describe('PerformanceMetricsDisplay', () => {
    it('renders correctly when visible', () => {
        const metrics = {
            goalsScored: 5,
            assistsMade: 2,
            passAccuracy: 80,
            playerRating: 8.5,
        };
        const { getByText } = render(<PerformanceMetricsDisplay isVisible={true} performanceMetrics={metrics} />);

        expect(getByText('5 Goals Scored')).toBeInTheDocument();
        expect(getByText('2 Assists Made')).toBeInTheDocument();
        expect(getByText('80% Pass Accuracy')).toBeInTheDocument();
        expect(getByText('Player Rating: 8.5')).toBeInTheDocument();
    });

    it('does not render when not visible', () => {
        const { container } = render(<PerformanceMetricsDisplay isVisible={false} performanceMetrics={{}} />);
        expect(container.firstChild).toBeNull();
    });
});