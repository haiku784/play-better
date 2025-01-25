import React from 'react';
import recordingService from '../services/recordingService';

const StartRecordingButton = ({ resolution, frameRate, onStreamInitialized }) => {
    const handleStartRecording = async () => {
        const result = await recordingService.initializeStream({ resolution, frame_rate: frameRate });
        onStreamInitialized(result.stream_id, result.status);
    };

    return <button onClick={handleStartRecording}>Start Recording</button>;
};

export default StartRecordingButton;