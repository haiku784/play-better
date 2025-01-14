// TypeScript interface for trimmed recording metadata
export interface TrimmedRecordingMetadata {
    original_recording_id: string;
    trimmed_session_id: string;
    trimmed_duration: number; // Duration in seconds
    start_time: Date;
    end_time: Date;
}