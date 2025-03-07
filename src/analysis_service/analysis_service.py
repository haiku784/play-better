# analysis_service/models.py
from django.db import models

class PerformanceMetrics(models.Model):
    recording_id = models.CharField(max_length=255, unique=True)
    kills = models.IntegerField(default=0)
    deaths = models.IntegerField(default=0)
    assists = models.IntegerField(default=0)
    accuracy = models.FloatField(default=0.0)
    decision_score = models.FloatField(default=0.0)

    def __str__(self):
        return f"PerformanceMetrics(recording_id={self.recording_id})"

# analysis_service/services.py
class AnalysisService:
    def analyze_recording(self, recording_data):
        """
        Analyzes the recording data and generates performance metrics.
        :param recording_data: dict containing recording information
        :return: PerformanceMetrics instance
        :raises ValueError: if recording_data is invalid
        """
        if not recording_data:
            raise ValueError("Invalid recording data")

        # Dummy analysis logic
        metrics = PerformanceMetrics(
            recording_id=recording_data['id'],
            kills=recording_data.get('kills', 0),
            deaths=recording_data.get('deaths', 0),
            assists=recording_data.get('assists', 0),
            accuracy=recording_data.get('accuracy', 0.0),
            decision_score=recording_data.get('decision_score', 0.0)
        )
        metrics.save()
        return metrics

# analysis_service/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PerformanceMetrics
from .services import AnalysisService

@api_view(['POST'])
def analyze_recording(request):
    """
    API endpoint to analyze a recording.
    :param request: HTTP request containing recording data
    :return: JSON response with analysis results
    """
    service = AnalysisService()
    try:
        metrics = service.analyze_recording(request.data)
        return Response({
            'recording_id': metrics.recording_id,
            'kills': metrics.kills,
            'deaths': metrics.deaths,
            'assists': metrics.assists,
            'accuracy': metrics.accuracy,
            'decision_score': metrics.decision_score
        }, status=status.HTTP_201_CREATED)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# analysis_service/urls.py
from django.urls import path
from .views import analyze_recording

urlpatterns = [
    path('analyze/', analyze_recording, name='analyze_recording'),
]

# analysis_service/tests.py
from django.test import TestCase
from .models import PerformanceMetrics
from .services import AnalysisService

class AnalysisServiceTests(TestCase):
    def setUp(self):
        self.service = AnalysisService()

    def test_analyze_recording_valid_data(self):
        recording_data = {
            'id': 'recording_1',
            'kills': 10,
            'deaths': 5,
            'assists': 3,
            'accuracy': 75.0,
            'decision_score': 85.0
        }
        metrics = self.service.analyze_recording(recording_data)
        self.assertEqual(metrics.kills, 10)
        self.assertEqual(metrics.deaths, 5)

    def test_analyze_recording_invalid_data(self):
        with self.assertRaises(ValueError):
            self.service.analyze_recording(None)
