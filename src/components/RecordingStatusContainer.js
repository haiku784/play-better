import React, { useState } from 'react';
import RecordingStatusDisplay from './RecordingStatusDisplay';
import StartRecordingButton from './StartRecordingButton';
import StopRecordingButton from './StopRecordingButton';

const RecordingStatusContainer = () => {
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = () => {
        // Logic to start recording goes here
        setIsRecording(true);
    };

    const stopRecording = () => {
        // Logic to stop recording goes here
        setIsRecording(false);
    };

    return (
        <div>
            <RecordingStatusDisplay isRecording={isRecording} />
            <StartRecordingButton onStart={startRecording} />
            <StopRecordingButton onStop={stopRecording} />
        </div>
    );
};

export default RecordingStatusContainer;
