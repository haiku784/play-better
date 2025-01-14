import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaybackControls from './PlaybackControls';

describe('PlaybackControls', () => {
    test('renders playback buttons', () => {
        render(<PlaybackControls />);
        expect(screen.getByText(/Play/i)).toBeInTheDocument();
        expect(screen.getByText(/Pause/i)).toBeInTheDocument();
        expect(screen.getByText(/Rewind/i)).toBeInTheDocument();
        expect(screen.getByText(/Fast Forward/i)).toBeInTheDocument();
    });

    test('play button starts playback', () => {
        render(<PlaybackControls />);
        fireEvent.click(screen.getByText(/Play/i));
        expect(screen.getByText(/Play/i)).toBeDisabled();
        expect(screen.getByText(/Pause/i)).toBeEnabled();
    });

    test('pause button pauses playback', () => {
        render(<PlaybackControls />);
        fireEvent.click(screen.getByText(/Play/i));
        fireEvent.click(screen.getByText(/Pause/i));
        expect(screen.getByText(/Pause/i)).toBeDisabled();
        expect(screen.getByText(/Play/i)).toBeEnabled();
    });

    test('speed slider changes playback speed', () => {
        render(<PlaybackControls />);
        const slider = screen.getByLabelText(/Speed:/i);
        fireEvent.change(slider, { target: { value: '1.5' } });
        expect(slider).toHaveValue(1.5);
    });
});