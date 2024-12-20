import unittest
from performance_metrics_extractor import PerformanceMetricsExtractor

class TestPerformanceMetricsExtractor(unittest.TestCase):
    def setUp(self):
        self.sample_data = [
            {'score': 100, 'result': 'win'},
            {'score': 200, 'result': 'lose'},
            {'score': 150, 'result': 'win'},
        ]
        self.extractor = PerformanceMetricsExtractor(self.sample_data)

    def test_calculate_average_score(self):
        average = self.extractor.calculate_average_score()
        self.assertEqual(average, 150.0)

    def test_calculate_win_rate(self):
        win_rate = self.extractor.calculate_win_rate()
        self.assertEqual(win_rate, 2/3)

if __name__ == '__main__':
    unittest.main()