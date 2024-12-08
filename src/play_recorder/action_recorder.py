# Start recording for a player action.
class ActionRecorder:
    def record_action(self, action):
        if self.is_recording:
            timestamp = time.time()
            self.recordings.append({'action': action, 'time': timestamp})
            print(f'Action recorded: {action} at {timestamp}')
        else:
            print('Recording is not currently active.')

# Sample usage
recorder = PlayRecorder()
recorder.start_recording()
action_recorder = ActionRecorder()
action_recorder.record_action('Jump')
recorder.stop_recording() 
