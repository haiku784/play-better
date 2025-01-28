import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PlaybackControls from './playbackControls';

// Unit tests for PlaybackControls component
describe('PlaybackControls', () => {
    it('should render playback buttons', () => {
        render(<PlaybackControls sessionId="test-session" />);
        expect(screen.getByText(/Play/i)).toBeInTheDocument();
        expect(screen.getByText(/Pause/i)).toBeInTheDocument();
        expect(screen.getByText(/Rewind/i)).toBeInTheDocument();
        expect(screen.getByText(/Fast Forward/i)).toBeInTheDocument();
    });

    it('should update current time on play', async () => {
        render(<PlaybackControls sessionId="test-session" />);
        fireEvent.click(screen.getByText(/Play/i));
        // Add expectations to verify current time updates accordingly
    });

    it('should call stopPlayback on stop button', async () => {
        render(<PlaybackControls sessionId="test-session" />);
        // Assume stopPlayback is a mock function.
        fireEvent.click(screen.getByText(/Stop/i));
        // Add expectations to verify onPlaybackStopped is triggered
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaybackControls from './playbackControls';

// Tests for the PlaybackControls component
describe('PlaybackControls', () => {
    test('renders playback controls', () => {
        render(<PlaybackControls />);
        expect(screen.getByRole('button', { name: /Start Playback/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Stop Playback/i })).toBeInTheDocument();
    });

    test('calls onStart when Start Playback is clicked', () => {
        const onStartMock = jest.fn();
        render(<PlaybackControls onStart={onStartMock} />);
        fireEvent.click(screen.getByRole('button', { name: /Start Playback/i }));
        expect(onStartMock).toHaveBeenCalled();
    });

    test('calls onStop when Stop Playback is clicked', () => {
        const onStopMock = jest.fn();
        render(<PlaybackControls onStop={onStopMock} />);
        fireEvent.click(screen.getByRole('button', { name: /Stop Playback/i }));
        expect(onStopMock).toHaveBeenCalled();
    });
});