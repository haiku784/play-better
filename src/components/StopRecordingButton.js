import React, { useState } from 'react';

/**
 * StopRecordingButton component to handle stopping gameplay recordings.
 * It uses a button to trigger the stop function and updates the UI accordingly.
 */
const StopRecordingButton = ({ onStop }) => {
    // Local state to manage button loading and disabled state
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the click event to stop the recording.
     * It sets the loading state while processing.
     */
    const handleStopClick = async () => {
        setIsLoading(true);
        // Call the onStop function passed as a prop
        await onStop();
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleStopClick} 
            disabled={isLoading} 
            style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
            }}>
            {isLoading ? 'Stopping...' : 'Stop Recording'}
        </button>
    );
};

export default StopRecordingButton;