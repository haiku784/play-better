import React from 'react';
import { render, screen } from '@testing-library/react';
import PerformanceMetricsDashboard from '../PerformanceMetricsDashboard';

describe('PerformanceMetricsDashboard', () => {
    it('renders loading state initially', () => {
        render(<PerformanceMetricsDashboard />);
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });

    // Additional test cases for error handling and rendering with data.
});