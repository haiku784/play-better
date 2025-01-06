import React from 'react';
import { render, screen } from '@testing-library/react';
import PerformanceMonitor from './PerformanceMonitor';

describe('PerformanceMonitor Component', () => {
    test('should display initial loading message', () => {
        render(<PerformanceMonitor />);
        const loadingMessage = screen.getByText(/Performance Monitor is active/i);
        expect(loadingMessage).toBeInTheDocument();
    });

    test('should display load time after unmount', () => {
        const { unmount } = render(<PerformanceMonitor />);
        unmount(); // Simulate unmounting the component
        // Here, we would need to mock the performance.now() method to test load time
        // This is a simplified example; in practice you'd use jest to mock the timing.
    });
});