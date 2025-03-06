# models.py
from django.db import models

class GameplaySession(models.Model):
    session_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()  # ForeignKey to User model can be used
    video_data = models.TextField()  # URL or path to video data
    metrics = models.JSONField()  # Store metrics as JSON
    timestamps = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"GameplaySession {self.session_id} for User {self.user_id}"


# serializers.py
from rest_framework import serializers
from .models import GameplaySession

class GameplaySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameplaySession
        fields = ['session_id', 'user_id', 'video_data', 'metrics', 'timestamps']


# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import GameplaySession
from .serializers import GameplaySessionSerializer

class RecordingServiceViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = GameplaySessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        sessions = GameplaySession.objects.all()
        serializer = GameplaySessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            session = GameplaySession.objects.get(pk=pk)
            serializer = GameplaySessionSerializer(session)
            return Response(serializer.data)
        except GameplaySession.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            session = GameplaySession.objects.get(pk=pk)
            serializer = GameplaySessionSerializer(session, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except GameplaySession.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            session = GameplaySession.objects.get(pk=pk)
            session.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except GameplaySession.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecordingServiceViewSet

router = DefaultRouter()
router.register(r'recordings', RecordingServiceViewSet, basename='recording')

urlpatterns = [
    path('', include(router.urls)),
]


# tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import GameplaySession

class RecordingServiceTests(APITestCase):
    def test_create_recording(self):
        url = reverse('recording-list')
        data = {
            'user_id': 1,
            'video_data': 'http://example.com/video.mp4',
            'metrics': {'kills': 10, 'deaths': 2}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_recordings(self):
        url = reverse('recording-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_recording(self):
        session = GameplaySession.objects.create(user_id=1, video_data='http://example.com/video.mp4', metrics={'kills': 10, 'deaths': 2})
        url = reverse('recording-detail', args=[session.session_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_recording(self):
        session = GameplaySession.objects.create(user_id=1, video_data='http://example.com/video.mp4', metrics={'kills': 10, 'deaths': 2})
        url = reverse('recording-detail', args=[session.session_id])
        data = {'user_id': 1, 'video_data': 'http://example.com/video_updated.mp4', 'metrics': {'kills': 15, 'deaths': 1}}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_recording(self):
        session = GameplaySession.objects.create(user_id=1, video_data='http://example.com/video.mp4', metrics={'kills': 10, 'deaths': 2})
        url = reverse('recording-detail', args=[session.session_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(GameplaySession.objects.count(), 0)

# settings.py
# Add 'rest_framework' and your app name to INSTALLED_APPS
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'your_app_name',
]  


# requirements.txt
Django>=3.2,<4.0
 djangorestframework>=3.12,<4.0
 psycopg2-binary

# To run the tests, use:
# python manage.py test your_app_name

# To run the server, use:
# python manage.py runserver

# To apply migrations, use:
# python manage.py makemigrations
# python manage.py migrate

# API Endpoints
# 1. POST /recordings/ - Create a new gameplay session
# 2. GET /recordings/ - List all gameplay sessions
# 3. GET /recordings/{id}/ - Retrieve a specific gameplay session
# 4. PUT /recordings/{id}/ - Update a specific gameplay session
# 5. DELETE /recordings/{id}/ - Delete a specific gameplay session


# Note: Replace 'your_app_name' with the actual name of your Django application.