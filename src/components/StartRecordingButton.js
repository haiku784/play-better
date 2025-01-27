import React from 'react';

/**
 * StartRecordingButton Component to start the video recording.
 */
const StartRecordingButton = ({ onStart }) => {
    return (
        <button onClick={onStart}>Start Recording</button>
    );
};

export default StartRecordingButton;