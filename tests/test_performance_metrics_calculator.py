import unittest
from api.performance_metrics_calculator import PlayerMetricsCalculator

class TestPlayerMetricsCalculator(unittest.TestCase):
    """Unit tests for PlayerMetricsCalculator methods."""

    def test_calculate_player_metrics(self):
        match_data = [
            {'goals': 2, 'assists': 1, 'total_passes': 10, 'successful_passes': 8},
            {'goals': 1, 'assists': 0, 'total_passes': 5, 'successful_passes': 4}
        ]
        expected_output = {
            'goals': 3,
            'assists': 1,
            'passAccuracy': 80.0,
            'playerRating': 3.5
        }
        result = PlayerMetricsCalculator.calculate_player_metrics('player123', match_data)
        self.assertEqual(result, expected_output)

if __name__ == '__main__':
    unittest.main()