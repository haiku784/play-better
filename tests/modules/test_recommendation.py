import unittest
from recommendation import Recommender

class TestRecommendationModule(unittest.TestCase):
    def setUp(self):
        # Initialize the Recommender class before each test
        self.recommender = Recommender()
    
    def test_recommend(self):
        # Test if recommendations are generated correctly
        recommendations = self.recommender.recommend(['item1', 'item2'])
        self.assertIsInstance(recommendations, list, "Recommendations should be a list")
        self.assertGreater(len(recommendations), 0, "There should be some recommendations")

    def test_recommend_empty_input(self):
        # Test the response of recommendations with empty input
        recommendations = self.recommender.recommend([])
        self.assertEqual(recommendations, [], "Recommendations should be empty for no input")

if __name__ == '__main__':
    unittest.main()