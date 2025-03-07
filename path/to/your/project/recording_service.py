# models.py
from django.db import models

class GameplaySession(models.Model):
    session_id = models.AutoField(primary_key=True)
    game_title = models.CharField(max_length=255)
    platform = models.CharField(max_length=50)
    duration = models.DurationField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.game_title} - {self.session_id}'

# services.py
from .models import GameplaySession

class RecordingService:
    """
    Service for managing gameplay recordings.
    """

    @staticmethod
    def start_recording(game_title: str, platform: str) -> GameplaySession:
        """
        Starts a new gameplay recording session.
        
        :param game_title: Title of the game being recorded.
        :param platform: Platform on which the game is played.
        :return: GameplaySession instance.
        :raises ValueError: If game_title or platform is empty.
        """
        if not game_title or not platform:
            raise ValueError('Game title and platform cannot be empty.')
        session = GameplaySession(game_title=game_title, platform=platform, duration=0)
        session.save()
        return session

    @staticmethod
    def stop_recording(session_id: int) -> GameplaySession:
        """
        Stops the recording session and updates the duration.
        
        :param session_id: ID of the gameplay session to stop.
        :return: Updated GameplaySession instance.
        :raises GameplaySession.DoesNotExist: If session_id does not exist.
        """
        session = GameplaySession.objects.get(session_id=session_id)
        session.duration = ...  # Logic to calculate duration
        session.save()
        return session

# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import GameplaySession
from .services import RecordingService
from .serializers import GameplaySessionSerializer

class GameplaySessionViewSet(viewsets.ViewSet):
    """
    ViewSet for managing gameplay sessions.
    """

    def create(self, request):
        """
        Starts a new gameplay recording session.
        
        :param request: HTTP request containing game title and platform.
        :return: Response with session details or error message.
        """
        game_title = request.data.get('game_title')
        platform = request.data.get('platform')
        try:
            session = RecordingService.start_recording(game_title, platform)
            serializer = GameplaySessionSerializer(session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def stop(self, request, pk=None):
        """
        Stops a gameplay recording session.
        
        :param request: HTTP request.
        :param pk: ID of the session to stop.
        :return: Response with updated session details or error message.
        """
        try:
            session = RecordingService.stop_recording(pk)
            serializer = GameplaySessionSerializer(session)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GameplaySession.DoesNotExist:
            return Response({'error': 'Session not found.'}, status=status.HTTP_404_NOT_FOUND)

# serializers.py
from rest_framework import serializers
from .models import GameplaySession

class GameplaySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameplaySession
        fields = '__all__'

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameplaySessionViewSet

router = DefaultRouter()
router.register(r'sessions', GameplaySessionViewSet, basename='gameplaysession')

urlpatterns = [
    path('', include(router.urls)),
]  

# tests.py
from django.test import TestCase
from .models import GameplaySession
from .services import RecordingService

class RecordingServiceTests(TestCase):
    def test_start_recording(self):
        session = RecordingService.start_recording('Game A', 'PC')
        self.assertEqual(session.game_title, 'Game A')
        self.assertEqual(session.platform, 'PC')

    def test_stop_recording(self):
        session = RecordingService.start_recording('Game B', 'Console')
        # Simulate stopping the recording
        session.duration = 3600  # 1 hour
        session.save()
        updated_session = RecordingService.stop_recording(session.session_id)
        self.assertEqual(updated_session.duration.total_seconds(), 3600)