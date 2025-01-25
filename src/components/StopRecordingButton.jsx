import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stopRecording } from '../services/recordingService';

const StopRecordingButton = ({ recordingId }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [stopStatus, setStopStatus] = useState('');

    const handleStopRecording = async () => {
        // Set the recording status to false
        setIsRecording(false);
        // Call the stop recording service
        try {
            const { status, filePath } = await stopRecording(recordingId);
            // Update stop status with the received status
            setStopStatus(status);
            // Trigger the recordingStopped effect with the file path
            if (status === 'success') {
                // Handle the successful stop recording case here if needed
                console.log(`Recording successfully stopped. File saved at: ${filePath}`);
            }
        } catch (error) {
            // Handle error case
            console.error('Error stopping recording:', error);
            setStopStatus('Error stopping recording.');
        }
    };

    return (
        <div>
            <button className="button-danger" onClick={handleStopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            <div className="stop-status-message">{stopStatus}</div>
        </div>
    );
};

StopRecordingButton.propTypes = {
    recordingId: PropTypes.string.isRequired,
};

export default StopRecordingButton;