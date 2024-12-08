# Optimize memory usage during recording.
import time
import sys

class PlayRecorder:
    def __init__(self):
        self.recordings = []
        self.is_recording = False
        self.max_memory = 1024 * 1024  # 1MB max memory usage
       
    def check_memory_usage(self):
        current_memory = sys.getsizeof(self.recordings)
        if current_memory > self.max_memory:
            print(f'Memory limit exceeded: {current_memory} bytes. Consider clearing old recordings.')

    def record_action(self, action):
        if self.is_recording:
            self.recordings.append(action)
            self.check_memory_usage()

# Sample usage
recorder = PlayRecorder()
recorder.start_recording()
recorder.record_action('Move Forward') 
