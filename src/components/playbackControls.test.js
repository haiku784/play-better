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