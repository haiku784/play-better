# analysis_service/tests.py
from django.test import TestCase
from .models import PerformanceMetrics, GameplaySession

class PerformanceMetricsModelTest(TestCase):
    def setUp(self):
        self.session = GameplaySession.objects.create(
            session_id='session1',
            game_title='Game A',
            duration=120,
            recorded_data=b'"x00\x01'
        )
        self.metrics = PerformanceMetrics.objects.create(
            kills=10,
            deaths=5,
            assists=3,
            accuracy=75.5,
            gameplay_session=self.session
        )

    def test_performance_metrics_creation(self):
        self.assertEqual(self.metrics.kills, 10)
        self.assertEqual(self.metrics.deaths, 5)
        self.assertEqual(self.metrics.assists, 3)
        self.assertEqual(self.metrics.accuracy, 75.5)
        self.assertEqual(self.metrics.gameplay_session, self.session)