import unittest
from src.api.logging.performance_metrics_logger import log_performance_metrics

class TestPerformanceMetricsLogger(unittest.TestCase):
    """ Unit tests for the PerformanceMetricsLogger. """
    def test_log_performance_metrics(self):
        # Test logging functionality by checking the log file
        log_performance_metrics(900, 100, 12.34)
        with open('logs/performance_metrics.log', 'r') as file:
            logs = file.readlines()
        self.assertIn('900 successes', logs[-1])
        self.assertIn('100 failures', logs[-1])
        self.assertIn('Duration: 12.34', logs[-1])

if __name__ == '__main__':
    unittest.main()