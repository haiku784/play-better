import unittest
from api.recommendation_algorithm import RecommendationAlgorithm

class TestRecommendationAlgorithm(unittest.TestCase):
    def setUp(self):
        self.recommender = RecommendationAlgorithm()

    def test_recommendation_accuracy(self):
        user_data = {'performance_metric': 85}
        recommendations = self.recommender.generate_recommendations(user_data)
        self.assertIsInstance(recommendations, list)
        self.assertGreater(len(recommendations), 0)

    def test_recommendation_based_on_input(self):
        user_data = {'performance_metric': 90}
        recommendations = self.recommender.generate_recommendations(user_data)
        expected_recommendation = 'High Performance Gear'
        self.assertIn(expected_recommendation, recommendations)

if __name__ == '__main__':
    unittest.main()