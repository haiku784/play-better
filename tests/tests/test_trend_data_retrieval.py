import unittest
from modules.trend_data_retrieval import TrendDataRetrieval

class TestTrendDataRetrieval(unittest.TestCase):
    def test_get_trend_data_success(self):
        result = TrendDataRetrieval.get_trend_data('scoring_trends')
        self.assertIn('trendData', result)

    def test_get_trend_data_not_found(self):
        with self.assertRaises(Exception):
            TrendDataRetrieval.get_trend_data('invalid_category')

if __name__ == '__main__':
    unittest.main()