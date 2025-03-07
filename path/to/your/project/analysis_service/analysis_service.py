# analysis_service/models.py
from django.db import models

class GameplaySession(models.Model):
    session_id = models.AutoField(primary_key=True)
    game_title = models.CharField(max_length=255)
    platform = models.CharField(max_length=100)
    duration = models.DurationField()

    def __str__(self):
        return f'{self.game_title} on {self.platform}'

class PerformanceMetrics(models.Model):
    metrics_id = models.AutoField(primary_key=True)
    gameplay_session = models.ForeignKey(GameplaySession, on_delete=models.CASCADE)
    kill_death_ratio = models.FloatField()
    accuracy = models.FloatField()
    objectives_completed = models.IntegerField()

    def __str__(self):
        return f'Metrics for {self.gameplay_session}'

# analysis_service/services.py
from .models import GameplaySession, PerformanceMetrics

class AnalysisService:
    @staticmethod
    def calculate_metrics(session_id: int) -> PerformanceMetrics:
        try:
            session = GameplaySession.objects.get(session_id=session_id)
            # Simulated metrics calculation
            metrics = PerformanceMetrics(
                gameplay_session=session,
                kill_death_ratio=1.5,
                accuracy=75.0,
                objectives_completed=5
            )
            metrics.save()
            return metrics
        except GameplaySession.DoesNotExist:
            raise ValueError('Gameplay session not found')

# analysis_service/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import AnalysisService

@api_view(['POST'])
def analyze_session(request):
    session_id = request.data.get('session_id')
    if not session_id:
        return Response({'error': 'session_id is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        metrics = AnalysisService.calculate_metrics(session_id)
        return Response({'metrics_id': metrics.metrics_id}, status=status.HTTP_201_CREATED)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

# analysis_service/urls.py
from django.urls import path
from .views import analyze_session

urlpatterns = [
    path('analyze/', analyze_session, name='analyze_session'),
]

# analysis_service/tests.py
from django.test import TestCase
from .models import GameplaySession, PerformanceMetrics
from rest_framework.test import APIClient

class AnalysisServiceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.session = GameplaySession.objects.create(
            game_title='Test Game',
            platform='PC',
            duration='00:30:00'
        )

    def test_analyze_session_success(self):
        response = self.client.post('/analyze/', {'session_id': self.session.session_id})
        self.assertEqual(response.status_code, 201)
        self.assertIn('metrics_id', response.data)

    def test_analyze_session_not_found(self):
        response = self.client.post('/analyze/', {'session_id': 999})
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)

    def test_analyze_session_missing_id(self):
        response = self.client.post('/analyze/', {})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)