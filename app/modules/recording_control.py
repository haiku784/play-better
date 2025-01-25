# recording_control.py

class RecordingControl:
    """Handles the initiation, control, and termination of gameplay recordings."""

    recordings = {}  # Store active recordings

    def start_recording(self, session_id: str, resolution: str, frame_rate: int, audio_enabled: bool = False):
        """Initiates a new recording session based on provided parameters."""
        if frame_rate <= 0:
            raise ValueError("Frame rate must be a positive integer.")
        # Simulate recording ID generation
        recording_id = f'rec_{len(self.recordings) + 1}'
        self.recordings[recording_id] = {'session_id': session_id, 'resolution': resolution, 'frame_rate': frame_rate, 'audio_enabled': audio_enabled}
        return recording_id  # Return the recording ID

    def stop_recording(self, recording_id: str):
        """Stops an ongoing recording session and finalizes the video file."""
        if recording_id not in self.recordings:
            raise ValueError("Invalid recording ID.")
        # Simulate finalizing the recording
        recording_path = f'/path/to/recording/{recording_id}.mp4'
        del self.recordings[recording_id]  # Remove from active recordings
        return recording_path  # Return the file path to the saved recording file