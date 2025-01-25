import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaybackControl from '../components/PlaybackControl';

/**
 * Unit tests for PlaybackControl component.
 */
describe('PlaybackControl', () => {
    it('renders start button', () => {
        render(<PlaybackControl sessionId="session1" userId="user1" />);
        expect(screen.getByText(/start/i)).toBeInTheDocument();
    });

    it('displays error message on playback error', async () => {
        // Mock implementation of startPlayback to simulate an error
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ status: 'error', message: 'Playback failed.' })
        }));

        render(<PlaybackControl sessionId="session1" userId="user1" />);
        fireEvent.click(screen.getByText(/start/i));

        const errorMessage = await screen.findByText(/Playback failed./i);
        expect(errorMessage).toBeInTheDocument();
    });
});