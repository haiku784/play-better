# models.py
from django.db import models

class GameplaySession(models.Model):
    session_id = models.CharField(max_length=255, unique=True)
    game_title = models.CharField(max_length=255)
    duration = models.IntegerField()  # Duration in seconds
    recorded_data = models.BinaryField()

    def __str__(self):
        return f'{self.game_title} - {self.session_id}'

# serializers.py
from rest_framework import serializers
from .models import GameplaySession

class GameplaySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameplaySession
        fields = '__all__'

# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import GameplaySession
from .serializers import GameplaySessionSerializer

class RecordingController(viewsets.ViewSet):
    def start_recording(self, request):
        serializer = GameplaySessionSerializer(data=request.data)
        if serializer.is_valid():
            gameplay_session = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def stop_recording(self, request, session_id):
        try:
            gameplay_session = GameplaySession.objects.get(session_id=session_id)
            # Logic to stop recording and finalize session
            return Response({'message': 'Recording stopped successfully.'}, status=status.HTTP_200_OK)
        except GameplaySession.DoesNotExist:
            return Response({'error': 'Session not found.'}, status=status.HTTP_404_NOT_FOUND)

# urls.py
from django.urls import path
from .views import RecordingController

urlpatterns = [
    path('recording/start/', RecordingController.as_view({'post': 'start_recording'}), name='start_recording'),
    path('recording/stop/<str:session_id>/', RecordingController.as_view({'post': 'stop_recording'}), name='stop_recording'),
]

# tests.py
from django.test import TestCase
from .models import GameplaySession
from rest_framework import status
from rest_framework.test import APIClient

class RecordingServiceTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_start_recording(self):
        response = self.client.post('/recording/start/', {
            'session_id': 'session123',
            'game_title': 'Test Game',
            'duration': 120,
            'recorded_data': b'"x00\x01'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_stop_recording(self):
        GameplaySession.objects.create(session_id='session123', game_title='Test Game', duration=120, recorded_data=b'\x00\x01')
        response = self.client.post('/recording/stop/session123/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_stop_recording_not_found(self):
        response = self.client.post('/recording/stop/nonexistent/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)