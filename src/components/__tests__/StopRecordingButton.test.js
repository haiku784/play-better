import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StopRecordingButton from '../components/StopRecordingButton';
import { stopRecording } from '../services/recordingService';

jest.mock('../services/recordingService');

describe('StopRecordingButton', () => {
    const recordingId = '12345';
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders and handles stop recording', async () => {
        stopRecording.mockResolvedValueOnce({ status: 'success', filePath: '/recordings/12345.mp4' });

        const { getByText } = render(<StopRecordingButton recordingId={recordingId} />);
        const button = getByText(/Stop Recording/i);

        // Initially, button should be enabled
        expect(button).not.toBeDisabled();

        fireEvent.click(button);

        await waitFor(() => {
            expect(getByText(/success/i)).toBeInTheDocument();
        });
    });

    test('handles error on stop recording', async () => {
        stopRecording.mockRejectedValueOnce(new Error('Failed to stop recording'));

        const { getByText } = render(<StopRecordingButton recordingId={recordingId} />);
        const button = getByText(/Stop Recording/i);

        fireEvent.click(button);

        await waitFor(() => {
            expect(getByText(/Error stopping recording/i)).toBeInTheDocument();
        });
    });
});