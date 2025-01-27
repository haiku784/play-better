import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PerformanceMetricsOverlayForm from './PerformanceMetricsOverlayForm';

describe('PerformanceMetricsOverlayForm', () => {
    it('renders the form and submits successfully', async () => {
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();
        const { getByPlaceholderText, getByText } = render(<PerformanceMetricsOverlayForm onSuccess={mockOnSuccess} onError={mockOnError} />);

        fireEvent.change(getByPlaceholderText('Gameplay Video URL'), { target: { value: 'http://video.url' } });
        fireEvent.change(getByPlaceholderText('Metrics Data (JSON)'), { target: { value: JSON.stringify({ fps: 60, latency: 20 }) } });
        fireEvent.change(getByPlaceholderText('Overlay Options (JSON)'), { target: { value: JSON.stringify({ color: 'red' }) } });

        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(mockOnSuccess).toHaveBeenCalled());
    });

    it('handles errors correctly', async () => {
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();
        const { getByPlaceholderText, getByText } = render(<PerformanceMetricsOverlayForm onSuccess={mockOnSuccess} onError={mockOnError} />);

        fireEvent.change(getByPlaceholderText('Gameplay Video URL'), { target: { value: 'http://video.url' } });
        fireEvent.change(getByPlaceholderText('Metrics Data (JSON)'), { target: { value: JSON.stringify({ fps: 60, latency: 20 }) } });
        fireEvent.change(getByPlaceholderText('Overlay Options (JSON)'), { target: { value: JSON.stringify({ color: 'red' }) } });

        // Add a mock to simulate a failure in the API call
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('API failure')));

        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(mockOnError).toHaveBeenCalled());
        global.fetch.mockRestore(); // Restore the original implementation
    });
});