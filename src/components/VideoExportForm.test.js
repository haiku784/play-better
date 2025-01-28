import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoExportForm from './VideoExportForm';

describe('VideoExportForm', () => {
    test('renders form and submits correctly', async () => {
        const handleExportSuccess = jest.fn();
        render(<VideoExportForm onExportSuccess={handleExportSuccess} />);

        fireEvent.change(screen.getByPlaceholderText(/Video ID/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByPlaceholderText(/Format/i), { target: { value: 'MP4' } });
        fireEvent.change(screen.getByPlaceholderText(/User ID/i), { target: { value: 'user-1' } });
        fireEvent.change(screen.getByPlaceholderText(/Quality/i), { target: { value: '1080p' } });

        fireEvent.click(screen.getByText(/Export Video/i));

        // Mock the API response for success
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ success: true, filePath: '/exports/video.mp4' })
        }));

        // Wait for export to complete
        await screen.findByText(/Export successful!/i);

        expect(handleExportSuccess).toHaveBeenCalledWith('/exports/video.mp4');
    });

    test('handles API error', async () => {
        render(<VideoExportForm onExportSuccess={() => {}} />);

        fireEvent.change(screen.getByPlaceholderText(/Video ID/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByPlaceholderText(/Format/i), { target: { value: 'MP4' } });
        fireEvent.change(screen.getByPlaceholderText(/User ID/i), { target: { value: 'user-1' } });
        fireEvent.change(screen.getByPlaceholderText(/Quality/i), { target: { value: '1080p' } });

        fireEvent.click(screen.getByText(/Export Video/i));

        // Mock the API response for failure
        global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

        // Wait for error message display
        await screen.findByText(/Network Error/i);
    });
});