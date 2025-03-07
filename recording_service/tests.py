# recording_service/tests.py
from django.test import TestCase
from .models import GameplaySession

class GameplaySessionModelTest(TestCase):
    def setUp(self):
        GameplaySession.objects.create(game_title="Test Game", recording_data="data", performance_metrics={})

    def test_gameplay_session_creation(self):
        session = GameplaySession.objects.get(game_title="Test Game")
        self.assertEqual(session.recording_data, "data")
        self.assertEqual(session.performance_metrics, {})
