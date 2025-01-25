import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StartRecordingButton from './StartRecordingButton';
import recordingService from '../services/recordingService';

jest.mock('../services/recordingService');

describe('StartRecordingButton', () => {
    it('should start recording and display status', async () => {
        // Arrange
        recordingService.startRecording.mockResolvedValue({ recordingId: 'rec_12345' });
        const onStartRecording = jest.fn();

        render(<StartRecordingButton onStartRecording={onStartRecording} />);

        // Act
        fireEvent.click(screen.getByText('Start Recording'));

        // Assert
        expect(onStartRecording).toHaveBeenCalled();
        expect(await screen.findByText('Recording started successfully.')).toBeInTheDocument();
    });

    it('should handle recording failure', async () => {
        // Arrange
        recordingService.startRecording.mockRejectedValue(new Error('Recording failed'));
        const onStartRecording = jest.fn();

        render(<StartRecordingButton onStartRecording={onStartRecording} />);

        // Act
        fireEvent.click(screen.getByText('Start Recording'));

        // Assert
        expect(await screen.findByText('Failed to start recording.')).toBeInTheDocument();
    });
});