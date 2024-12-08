import time
import psutil

class PerformanceTester:
    def __init__(self):
        self.start_time = 0
        self.end_time = 0
        self.initial_memory = 0
        self.final_memory = 0

    def test_play_recorder(self):
        """
        Conducts a performance test on the play recorder and measures resource impact.
        """
        # Start memory tracking
        self.initial_memory = psutil.Process().memory_info().rss
        
        # Begin testing play recorder
        self.start_time = time.time()
        print('Testing play recorder...')
        self.simulate_play_recorder_usage()
        self.end_time = time.time()
        
        # End memory tracking
        self.final_memory = psutil.Process().memory_info().rss
        
        self.log_results()
        
    def simulate_play_recorder_usage(self):
        """
        A mock function to simulate usage of the play recorder functionality.
        """
        # Simulating the play recorder performing its tasks for 5 seconds
        time.sleep(5)
        
    def log_results(self):
        cpu_usage = psutil.cpu_percent()
        execution_time = self.end_time - self.start_time
        memory_used = self.final_memory - self.initial_memory
        
        print(f'Execution Time (seconds): {execution_time}')
        print(f'CPU Usage (%): {cpu_usage}')
        print(f'Memory Used (bytes): {memory_used}')

if __name__ == '__main__':
    tester = PerformanceTester()
    tester.test_play_recorder()