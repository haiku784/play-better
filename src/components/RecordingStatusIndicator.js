import React, { useState } from 'react';

/**
 * RecordingStatusIndicator component displays the recording status and feedback.
 */
const RecordingStatusIndicator = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    /**
     * Starts recording and updates the status.
     */
    const startRecording = () => {
        setIsRecording(true);
        setFeedbackMessage('Recording in progress...');

        // Simulate recording process
        setTimeout(() => {
            stopRecording();
        }, 5000); // Stops recording after 5 seconds
    };

    /**
     * Stops recording and gives confirmation feedback.
     */
    const stopRecording = () => {
        setIsRecording(false);
        setFeedbackMessage('Recording saved successfully!');

        // Reset feedback message after a delay
        setTimeout(() => {
            setFeedbackMessage('');
        }, 3000); // Clears message after 3 seconds
    };

    return (
        <div>
            <h1>{isRecording ? 'Recording...' : 'Not Recording'}</h1>
            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
            {feedbackMessage && <p>{feedbackMessage}</p>}
        </div>
    );
};

export default RecordingStatusIndicator;