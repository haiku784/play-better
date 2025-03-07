// src/__tests__/RecordingService.integration.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecordingService from '../components/RecordingService';

/**
 * Integration tests for RecordingService component.
 */
describe('RecordingService Integration', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([
                { recordingId: 1, gameTitle: 'Game A', date: '2023-10-01', duration: 30 },
                { recordingId: 2, gameTitle: 'Game B', date: '2023-10-02', duration: 45 }
            ])
        }));
    });

    test('fetches and displays recordings', async () => {
        render(<RecordingService />);
        await waitFor(() => {
            expect(screen.getByText(/Game A/i)).toBeInTheDocument();
            expect(screen.getByText(/Game B/i)).toBeInTheDocument();
        });
    });
});