# analysis_service/tests.py
from django.test import TestCase
from .models import PerformanceMetric

class PerformanceMetricTests(TestCase):
    def setUp(self):
        PerformanceMetric.objects.create(kills=10, deaths=2, assists=5, accuracy=75.0, session_id='session123')

    def test_performance_metric_creation(self):
        metric = PerformanceMetric.objects.get(session_id='session123')
        self.assertEqual(metric.kills, 10)
        self.assertEqual(metric.deaths, 2)
        self.assertEqual(metric.assists, 5)
        self.assertEqual(metric.accuracy, 75.0)
