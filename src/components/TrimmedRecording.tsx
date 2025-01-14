import React from 'react';
import { TrimmedRecordingMetadata } from '../types/TrimmedRecordingMetadata';

interface TrimmedRecordingProps {
    metadata: TrimmedRecordingMetadata;
}

const TrimmedRecording: React.FC<TrimmedRecordingProps> = ({ metadata }) => {
    return (
        <div>
            <h3>Trimmed Recording Metadata</h3>
            <p>Original Recording ID: {metadata.original_recording_id}</p>
            <p>Trimmed Session ID: {metadata.trimmed_session_id}</p>
            <p>Trimmed Duration: {metadata.trimmed_duration} seconds</p>
            <p>Start Time: {metadata.start_time.toString()}</p>
            <p>End Time: {metadata.end_time.toString()}</p>
        </div>
    );
};

export default TrimmedRecording;