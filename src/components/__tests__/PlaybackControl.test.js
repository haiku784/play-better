import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaybackControl from './PlaybackControl';

/**
 * Test suite for PlaybackControl component.
 */
describe('PlaybackControl Component', () => {
    test('renders Start Playback button', () => {
        render(<PlaybackControl sessionId="123" userId="abc" />);
        const buttonElement = screen.getByText(/start playback/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('displays error message when playback fails', async () => {
        // Mock a failed fetch response
        global.fetch = jest.fn(() => Promise.reject(new Error('Playback error')));
        render(<PlaybackControl sessionId="123" userId="abc" />);
        fireEvent.click(screen.getByText(/start playback/i));
        const errorMessage = await screen.findByText(/error:/i);
        expect(errorMessage).toBeInTheDocument();
    });
});