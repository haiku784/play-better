# Load previously recorded actions from a file.
import json

class PlayRecorder:
    # ... existing methods ...

    def load_recordings(self, filename='recordings.json'):
        try:
            with open(filename, 'r') as f:
                self.recordings = json.load(f)
            print(f'Recordings loaded from {filename}')
        except FileNotFoundError:
            print(f'File {filename} not found.')

# Sample usage
recorder = PlayRecorder()
recorder.load_recordings() 
