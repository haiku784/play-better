import React, { useState } from 'react';

// Define the props for the RecordingButton component
interface RecordingButtonProps {
    onStartRecording: () => Promise<void>;
    onStopRecording: () => Promise<void>;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({ onStartRecording, onStopRecording }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    // Handler for button click event
    const handleClick = async () => {
        if (isRecording) {
            await onStopRecording(); // Stop recording if currently recording
        } else {
            await onStartRecording(); // Start recording if not recording
        }
        setIsRecording(!isRecording); // Toggle recording state
    };

    return (
        <button onClick={handleClick}>
            {isRecording ? 'Stop' : 'Record'}
        </button>
    );
};

export default RecordingButton;