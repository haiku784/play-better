import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ReportingService from './ReportingService';

/**
 * Integration tests for ReportingService component.
 */
describe('ReportingService Integration', () => {
    beforeEach(() => {
        // Mock the fetch API to return sample reports
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    { reportId: 1, content: 'Report Content 1', timestamp: '2023-10-01T12:00:00Z' },
                    { reportId: 2, content: 'Report Content 2', timestamp: '2023-10-02T12:00:00Z' }
                ]),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('fetches and displays reports', async () => {
        render(<ReportingService />);
        await waitFor(() => {
            expect(screen.getByText(/User Reports/i)).toBeInTheDocument();
            expect(screen.getByText(/Report ID: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Report Content 1/i)).toBeInTheDocument();
        });
    });
});