import unittest
from modules.chart_generation import ChartGeneration

class TestChartGeneration(unittest.TestCase):
    def test_generate_chart_success(self):
        result = ChartGeneration.generate_chart([1, 2, 3], 'bar')
        self.assertIn('chartUrl', result)

    def test_generate_chart_failure(self):
        with self.assertRaises(Exception):
            ChartGeneration.generate_chart([], 'bar')

if __name__ == '__main__':
    unittest.main()