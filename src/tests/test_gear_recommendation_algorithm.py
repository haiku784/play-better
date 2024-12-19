import unittest
from api.gear_recommendation_algorithm import recommend_gear

class TestRecommendationAlgorithm(unittest.TestCase):
    def test_recommend_gear_valid_input(self):
        # Test with valid user preferences
        user_preferences = {'style': 'aggressive', 'experience': 5}
        result = recommend_gear(user_preferences)
        self.assertIsInstance(result, list)  # Expect a list of recommendations
        self.assertGreater(len(result), 0)  # Expect at least one recommendation

    def test_recommend_gear_no_preferences(self):
        # Test with no user preferences
        user_preferences = {}
        result = recommend_gear(user_preferences)
        self.assertEqual(result, [])  # Expect no recommendations

if __name__ == '__main__':
    unittest.main()
