# Save the recorded actions to a file.
import json

class PlayRecorder:
    # ... existing methods ...

    def save_recordings(self, filename='recordings.json'):
        with open(filename, 'w') as f:
            json.dump(self.recordings, f)
        print(f'Recordings saved to {filename}')

# Sample usage
recorder = PlayRecorder()
recorder.start_recording()
# Record actions...
recorder.stop_recording()
recorder.save_recordings() 
