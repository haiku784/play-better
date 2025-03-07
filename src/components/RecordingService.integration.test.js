import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Integration tests for the RecordingService component.
 */
describe('RecordingService Integration', () => {
    test('fetches and displays recorded sessions', async () => {
        // Mocking the fetch API
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, title: 'Session 1' }, { id: 2, title: 'Session 2' }]),
            })
        );

        render(<RecordingService />);

        // Wait for the sessions to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Session 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Session 2/i)).toBeInTheDocument();
        });

        // Clean up the mock
        global.fetch.mockClear();
    });
});