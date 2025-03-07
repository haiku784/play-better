# analysis_service/tests.py
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import PerformanceMetric

class PerformanceMetricTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_performance_metric(self):
        response = self.client.post('/performance-metrics/', {
            'user_id': 1,
            'game_title': 'Game A',
            'metrics': {'score': 100, 'kills': 10}
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_performance_metrics(self):
        PerformanceMetric.objects.create(user_id=1, game_title='Game A', metrics={'score': 100, 'kills': 10})
        response = self.client.get('/performance-metrics/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)