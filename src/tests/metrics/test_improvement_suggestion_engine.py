import unittest
from ..metrics.improvement_suggestion_engine import ImprovementSuggestionEngine

class TestImprovementSuggestionEngine(unittest.TestCase):
    def setUp(self):
        """Set up the test case for suggestion engine."""
        self.metrics = {'average_score': 40, 'win_rate': 0.4}
        self.suggestion_engine = ImprovementSuggestionEngine(self.metrics)

    def test_generate_suggestions(self):
        """Test suggestions generation based on metrics."""
        suggestions = self.suggestion_engine.generate_suggestions()
        self.assertIn('Focus on improving your accuracy.', suggestions)
        self.assertIn('Try to work on your teamwork.', suggestions)