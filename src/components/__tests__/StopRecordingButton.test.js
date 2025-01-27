import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopRecordingButton from './StopRecordingButton';

describe('StopRecordingButton Component', () => {
    let mockOnStopRecording;
    const recordingId = 'test_recording_id';

    beforeEach(() => {
        mockOnStopRecording = jest.fn();
    });

    test('renders button and displays initial state', () => {
        render(<StopRecordingButton recordingId={recordingId} onStopRecording={mockOnStopRecording} />);
        const button = screen.getByText(/stop recording/i);
        const statusMessage = screen.getByText('');
        expect(button).toBeInTheDocument();
        expect(statusMessage).toBeInTheDocument();
    });

    test('calls onStopRecording and updates status on button click', async () => {
        mockOnStopRecording.mockResolvedValueOnce({ status: 'success', filePath: '/path/to/recording.mp3' });
        render(<StopRecordingButton recordingId={recordingId} onStopRecording={mockOnStopRecording} />);

        const button = screen.getByText(/stop recording/i);
        fireEvent.click(button);

        // Wait for the status message to update
        const successMessage = await screen.findByText(/recording stopped successfully/i);
        expect(successMessage).toBeInTheDocument();
        expect(mockOnStopRecording).toHaveBeenCalledWith({ recordingId });
    });

    test('displays error message when no recordingId provided', async () => {
        render(<StopRecordingButton recordingId={null} onStopRecording={mockOnStopRecording} />);
        const button = screen.getByText(/stop recording/i);
        fireEvent.click(button);

        const errorMessage = await screen.findByText(/no recording session found/i);
        expect(errorMessage).toBeInTheDocument();
    });
});