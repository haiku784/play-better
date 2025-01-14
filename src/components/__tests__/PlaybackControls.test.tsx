import React from 'react';
import { render, screen } from '@testing-library/react';
import PlaybackControls from '../PlaybackControls';

describe('PlaybackControls', () => {
    it('should render playback buttons', () => {
        render(<PlaybackControls />);
        expect(screen.getByText(/play/i)).toBeInTheDocument();
        expect(screen.getByText(/pause/i)).toBeInTheDocument();
    });
});