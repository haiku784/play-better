import unittest
from src.models.gameplay_statistics import GameplayStatisticsModel
from datetime import datetime

class TestGameplayStatisticsModel(unittest.TestCase):
    def test_repr(self):
        stats = GameplayStatisticsModel(id=1, user_id=123, session_duration=30.5, wins=10, losses=3, score=1500.0, created_at=datetime.now())
        self.assertEqual(repr(stats), "<GameplayStatistics(id=1, user_id=123, session_duration=30.5, wins=10, losses=3, score=1500.0)>")

if __name__ == '__main__':
    unittest.main()