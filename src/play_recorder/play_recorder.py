# Play Recorder Initialization
import time

class PlayRecorder:
    def __init__(self):
        self.recordings = []  # To store the recorded play data.
        self.is_recording = False  # To track if recording is active.
        
    def start_recording(self):
        if not self.is_recording:
            self.is_recording = True
            print('Recording started.')
            # Could add a timestamp for tracking
            self.recordings.append(f'Recording started at {time.time()}')

    def stop_recording(self):
        if self.is_recording:
            self.is_recording = False
            print('Recording stopped.')
            self.recordings.append(f'Recording stopped at {time.time()}')

    def get_recordings(self):
        return self.recordings  # Returns a list of recorded play data
