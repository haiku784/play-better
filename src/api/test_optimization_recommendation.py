import unittest
import pandas as pd
from optimization_recommendation import OptimizationRecommendation

class TestOptimizationRecommendation(unittest.TestCase):
    def setUp(self):
        # Sample gameplay data for testing
        self.example_data = pd.DataFrame({
            'score': [40, 55, 60],
            'time_spent': [130, 90, 80],
            'actions_per_minute': [15, 25, 22]
        })
        self.optimizer = OptimizationRecommendation(self.example_data)

    def test_analyze_performance(self):
        avg_performance = self.optimizer.analyze_performance()
        self.assertAlmostEqual(avg_performance['score'], 51.666666666666664)
        self.assertAlmostEqual(avg_performance['time_spent'], 100.0)
        self.assertAlmostEqual(avg_performance['actions_per_minute'], 20.666666666666668)

    def test_suggest_optimizations(self):
        recommendations = self.optimizer.suggest_optimizations()
        self.assertIn('Increase difficulty level for better scoring', recommendations)
        self.assertIn('Reduce time spent on each level', recommendations)
        self.assertIn('Encourage more actions to improve engagement', recommendations)

if __name__ == '__main__':
    unittest.main()