import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportingService from './ReportingService';

/**
 * Unit tests for ReportingService component.
 */
describe('ReportingService', () => {
    test('renders loading state', () => {
        render(<ReportingService />);
        const loadingElement = screen.getByText(/Loading reports.../i);
        expect(loadingElement).toBeInTheDocument();
    });

    test('renders error message', () => {
        // Mock fetch to simulate an error
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
        render(<ReportingService />);
        const errorElement = screen.getByText(/Error:/i);
        expect(errorElement).toBeInTheDocument();
    });
});