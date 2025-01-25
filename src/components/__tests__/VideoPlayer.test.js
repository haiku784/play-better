import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer Component', () => {
    test('renders loading state', () => {
        const { getByText } = render(<VideoPlayer videoUrl="http://example.com/video.mp4" />);
        expect(getByText(/loading/i)).toBeInTheDocument();
    });

    test('handles play/pause functionality', () => {
        const { getByText } = render(<VideoPlayer videoUrl="http://example.com/video.mp4" />);
        const playButton = getByText(/play/i);
        fireEvent.click(playButton);
        expect(playButton).toHaveTextContent(/pause/i);
    });

    test('displays error message on video load failure', () => {
        // Simulate video load error
    });
});