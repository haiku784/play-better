import unittest
from unittest.mock import MagicMock
from src.api.services.gameplay_analysis_service import GameplayAnalysisService
from src.models.gameplay_session import GameplaySession

class TestGameplayAnalysisService(unittest.TestCase):
    def setUp(self):
        # Mock the GameplaySession object
        self.session = MagicMock(spec=GameplaySession)
        self.service = GameplayAnalysisService(self.session)

    def test_analyze_performance_with_metrics(self):
        # Set up mock metrics
        self.session.get_metrics.return_value = {'scores': [10, 20, 30], 'times': [5, 10, 15]}
        expected_results = {'average_score': 20.0, 'average_time': 10.0}
        results = self.service.analyze_performance()
        self.assertEqual(results, expected_results)

    def test_analyze_performance_no_metrics(self):
        # Test when no metrics are available
        self.session.get_metrics.return_value = {}
        results = self.service.analyze_performance()
        self.assertEqual(results, {})

    def test_track_progress(self):
        progress = 75.0
        self.service.track_progress(progress)
        self.session.update_progress.assert_called_once_with(progress)

    def test_generate_report(self):
        self.session.get_metrics.return_value = {'scores': [10, 20, 30], 'times': [5, 10, 15]}
        report = self.service.generate_report()
        self.assertIn('average_score', report)
        self.assertIn('average_time', report)

if __name__ == '__main__':
    unittest.main()