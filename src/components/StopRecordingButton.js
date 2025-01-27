import React from 'react';

/**
 * StopRecordingButton Component to stop the video recording.
 */
const StopRecordingButton = ({ onStop }) => {
    return (
        <button onClick={onStop}>Stop Recording</button>
    );
};

export default StopRecordingButton;