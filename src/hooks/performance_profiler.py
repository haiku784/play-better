from time import time
import logging

class PerformanceProfiler:
    def __init__(self):
        self.logs = []

    def profile(self, action_name: str):
        start_time = time()  # Start timing the action
        yield  # Execution of the action
        end_time = time()  # End timing
        duration = (end_time - start_time) * 1000  # Convert to milliseconds

        # Log the performance data
        if duration > 200:
            logging.warning(f"{action_name} took {duration:.2f}ms")
        self.logs.append((action_name, duration))

    def get_logs(self):
        return self.logs
