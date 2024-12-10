import unittest
from performance_analysis import PerformanceAnalyzer

class TestPerformanceAnalysisModule(unittest.TestCase):
    def setUp(self):
        # Initialize the PerformanceAnalyzer class before each test
        self.analyzer = PerformanceAnalyzer()
    
    def test_analyze_performance(self):
        # Test if performance analysis returns expected metrics
        metrics = self.analyzer.analyze({'accuracy': 0.95, 'loss': 0.05})
        self.assertIn('accuracy', metrics, "Metrics should contain 'accuracy'")
        self.assertGreater(metrics['accuracy'], 0.9, "Accuracy should be greater than 0.9")

    def test_analyze_invalid_data(self):
        # Test performance analysis with invalid input
        with self.assertRaises(TypeError):
            self.analyzer.analyze(None)

if __name__ == '__main__':
    unittest.main()