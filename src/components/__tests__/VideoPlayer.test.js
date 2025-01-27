import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

test('renders loading state', () => {
    render(<VideoPlayer videoUrl="http://example.com/video.mp4" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders video element after loading', async () => {
    render(<VideoPlayer videoUrl="http://example.com/video.mp4" />);
    // Wait for video to load
    const videoElement = await screen.findByRole('video');
    expect(videoElement).toBeInTheDocument();
});

test('handles video load error', async () => {
    // Mock fetch to simulate load error
    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to load video.')));
    render(<VideoPlayer videoUrl="http://example.com/video.mp4" />);
    // Wait for error message
    const errorMessage = await screen.findByText(/error loading video/i);
    expect(errorMessage).toBeInTheDocument();
});