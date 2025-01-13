import React, { useState } from 'react';
import axios from 'axios';

// Define props for the RecordButton component.
interface RecordButtonProps {
    apiUrl: string; // The URL of the backend API to start/stop recording.
}

const RecordButton: React.FC<RecordButtonProps> = ({ apiUrl }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    // Function to handle button click events.
    const handleClick = async () => {
        try {
            // Toggle recording state
            const action = isRecording ? 'stop' : 'start';
            const response = await axios.post(`${apiUrl}/${action}`);

            // Update recording state based on response
            if (response.status === 200) {
                setIsRecording(!isRecording);
            }
        } catch (error) {
            console.error('Error in recording:', error);
        }
    };

    return (
        <button onClick={handleClick}>
            {isRecording ? 'Stop' : 'Record'}
        </button>
    );
};

export default RecordButton;