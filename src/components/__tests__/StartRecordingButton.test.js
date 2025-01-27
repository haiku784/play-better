import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StartRecordingButton from './StartRecordingButton';

// Mock the onStartRecording function
const mockOnStartRecording = jest.fn();

describe('StartRecordingButton', () => {
    test('should call onStartRecording on button click', () => {
        const { getByText } = render(<StartRecordingButton onStartRecording={mockOnStartRecording} />);
        const button = getByText('Start Recording');
        fireEvent.click(button);
        expect(mockOnStartRecording).toHaveBeenCalled();
    });

    test('should update status message on recording start', async () => {
        mockOnStartRecording.mockResolvedValueOnce({ status: 'success', recordingId: 'recording123' });
        const { getByText } = render(<StartRecordingButton onStartRecording={mockOnStartRecording} />);
        fireEvent.click(getByText('Start Recording'));
        expect(getByText('Starting recording...')).toBeInTheDocument();
        expect(await getByText('success')).toBeInTheDocument();
    });
});