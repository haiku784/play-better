import unittest
from performance_test import performance_test
import time

class TestPerformanceMetrics(unittest.TestCase):
    def test_performance_with_10_million_records(self):
        start_time = time.time()
        performance_test("performance_test_db", "records", 10000000)
        end_time = time.time()
        duration = end_time - start_time
        self.assertLess(duration, 600, "Performance test exceeded 10 minutes")  # Ensure test runs within a reasonable time

if __name__ == '__main__':
    unittest.main()