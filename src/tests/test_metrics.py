import unittest
from src.metrics import extract_gameplay_metrics

class TestGameplayMetricsExtraction(unittest.TestCase):
    def setUp(self):
        # Setup any state before each test
        self.test_data = {
            'score': 100,
            'time_played': 3600,
            'level_reached': 5,
            'player_id': 'player_123'
        }

    def test_extract_gameplay_metrics_valid_data(self):
        # Test case for valid gameplay metrics extraction
        expected_output = {
            'score': 100,
            'time_played': 3600,
            'level_reached': 5,
            'player_id': 'player_123'
        }
        result = extract_gameplay_metrics(self.test_data)
        self.assertEqual(result, expected_output)

    def test_extract_gameplay_metrics_missing_score(self):
        # Test case for handling missing score
        input_data = self.test_data.copy()
        del input_data['score']
        with self.assertRaises(KeyError):
            extract_gameplay_metrics(input_data)

    def test_extract_gameplay_metrics_negative_score(self):
        # Test case for handling negative score
        input_data = self.test_data.copy()
        input_data['score'] = -50
        with self.assertRaises(ValueError):
            extract_gameplay_metrics(input_data)

    def tearDown(self):
        # Clean up after each test (if needed)
        pass

if __name__ == '__main__':
    unittest.main()