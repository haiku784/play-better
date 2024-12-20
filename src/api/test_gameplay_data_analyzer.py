import unittest
from gameplay_data_analyzer import GameplayDataAnalyzer

class TestGameplayDataAnalyzer(unittest.TestCase):
    def setUp(self):
        """ Sets up test data for the analyzer. """ 
        self.gameplay_data = json.dumps({
            "players": [
                {"name": "Player1", "performance_score": 85},
                {"name": "Player2", "performance_score": 75}
            ]
        })
        self.analyzer = GameplayDataAnalyzer(self.gameplay_data)

    def test_generate_gear_recommendations(self):
        """ Tests the gear recommendations generated by the analyzer. """ 
        recommendations = self.analyzer.generate_gear_recommendations()
        self.assertEqual(len(recommendations), 2)
        self.assertEqual(recommendations[0]['recommended_gear'], "High-End Gear")
        self.assertEqual(recommendations[1]['recommended_gear'], "Standard Gear")

if __name__ == '__main__':
    unittest.main()