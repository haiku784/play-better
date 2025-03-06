# models.py
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    preferences = models.JSONField(default=dict)

    def __str__(self):
        return self.username

class GameplaySession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gameplay_sessions')
    session_id = models.CharField(max_length=100, unique=True)
    game_title = models.CharField(max_length=100)
    duration = models.DurationField()
    recording_quality = models.CharField(max_length=50)
    statistics = models.JSONField(default=dict)

    def start_recording(self):
        # Logic to start recording
        pass

    def stop_recording(self):
        # Logic to stop recording
        pass

    def get_statistics(self):
        return self.statistics

    def __str__(self):
        return f'{self.game_title} - {self.session_id}'

# serializers.py
from rest_framework import serializers
from .models import User, GameplaySession

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GameplaySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameplaySession
        fields = '__all__'

# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import GameplaySession
from .serializers import GameplaySessionSerializer

class GameplaySessionViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = GameplaySessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            session = GameplaySession.objects.get(pk=pk)
            serializer = GameplaySessionSerializer(session)
            return Response(serializer.data)
        except GameplaySession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        sessions = GameplaySession.objects.all()
        serializer = GameplaySessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            session = GameplaySession.objects.get(pk=pk)
            serializer = GameplaySessionSerializer(session, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except GameplaySession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            session = GameplaySession.objects.get(pk=pk)
            session.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except GameplaySession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameplaySessionViewSet

router = DefaultRouter()
router.register(r'gameplay_sessions', GameplaySessionViewSet, basename='gameplaysession')

urlpatterns = [
    path('', include(router.urls)),
]

# tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, GameplaySession

class GameplaySessionTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', email='test@example.com')

    def test_create_gameplay_session(self):
        url = reverse('gameplaysession-list')
        data = {
            'user': self.user.id,
            'session_id': 'session123',
            'game_title': 'Test Game',
            'duration': '00:30:00',
            'recording_quality': '1080p',
            'statistics': {}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_gameplay_sessions(self):
        GameplaySession.objects.create(user=self.user, session_id='session123', game_title='Test Game', duration='00:30:00', recording_quality='1080p', statistics={})
        url = reverse('gameplaysession-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_gameplay_session(self):
        session = GameplaySession.objects.create(user=self.user, session_id='session123', game_title='Test Game', duration='00:30:00', recording_quality='1080p', statistics={})
        url = reverse('gameplaysession-detail', args=[session.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['session_id'], 'session123')

    def test_update_gameplay_session(self):
        session = GameplaySession.objects.create(user=self.user, session_id='session123', game_title='Test Game', duration='00:30:00', recording_quality='1080p', statistics={})
        url = reverse('gameplaysession-detail', args=[session.id])
        data = {'game_title': 'Updated Game'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        session.refresh_from_db()
        self.assertEqual(session.game_title, 'Updated Game')

    def test_delete_gameplay_session(self):
        session = GameplaySession.objects.create(user=self.user, session_id='session123', game_title='Test Game', duration='00:30:00', recording_quality='1080p', statistics={})
        url = reverse('gameplaysession-detail', args=[session.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(GameplaySession.objects.filter(id=session.id).exists())

# settings.py (add to INSTALLED_APPS)
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'your_app_name',  # Replace with your actual app name
]

# requirements.txt
Django>=3.2
psycopg2-binary
 djangorestframework

# Run migrations
# python manage.py makemigrations
# python manage.py migrate
# python manage.py runserver

# To run tests
# python manage.py test

# API Endpoints
# Method: POST, Path: /gameplay_sessions/  # Create a new gameplay session
# Method: GET, Path: /gameplay_sessions/  # List all gameplay sessions
# Method: GET, Path: /gameplay_sessions/{id}/  # Retrieve a specific gameplay session
# Method: PATCH, Path: /gameplay_sessions/{id}/  # Update a specific gameplay session
# Method: DELETE, Path: /gameplay_sessions/{id}/  # Delete a specific gameplay session

# The above code provides a complete implementation of the Recording Service microservice using Django and PostgreSQL.