import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecordingService from './RecordingService';

/**
 * Integration tests for the RecordingService component.
 */
describe('RecordingService Integration', () => {
    test('integration test for start and stop recording', async () => {
        global.fetch = jest.fn((url) => {
            if (url.includes('/recording/start/')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ sessionId: '123' })
                });
            } else if (url.includes('/recording/stop/')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({})
                });
            }
            return Promise.reject(new Error('not found'));
        });

        render(<RecordingService />);
        fireEvent.click(screen.getByText(/Start Recording/i));
        expect(await screen.findByText(/Recording in progress.../i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/Stop Recording/i));
        expect(await screen.findByText(/No recording in progress./i)).toBeInTheDocument();
    });
});