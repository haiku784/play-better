import unittest
from modules.trend_graph_generation import TrendGraphGeneration

class TestTrendGraphGeneration(unittest.TestCase):
    def test_generate_trend_graph_success(self):
        result = TrendGraphGeneration.generate_trend_graph([1, 2, 3])
        self.assertIn('trendGraphUrl', result)

    def test_generate_trend_graph_failure(self):
        with self.assertRaises(Exception):
            TrendGraphGeneration.generate_trend_graph([])

if __name__ == '__main__':
    unittest.main()