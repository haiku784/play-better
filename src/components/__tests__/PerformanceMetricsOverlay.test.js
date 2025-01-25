import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PerformanceMetricsOverlay from './PerformanceMetricsOverlay';

describe('PerformanceMetricsOverlay', () => {
    const mockStartOverlay = jest.fn();
    const mockStopOverlay = jest.fn();

    test('renders video stream and metrics', () => {
        render(<PerformanceMetricsOverlay video_stream="video.mp4" fps={30} latency={100} />);
        expect(screen.getByText(/FPS: 30/i)).toBeInTheDocument();
        expect(screen.getByText(/Latency: 100 ms/i)).toBeInTheDocument();
    });

    test('handles error message', () => {
        render(<PerformanceMetricsOverlay video_stream="video.mp4" fps={30} latency={100} />);
        // Simulate an error
        fireEvent.click(screen.getByText(/Start Overlay/i));
        expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
});