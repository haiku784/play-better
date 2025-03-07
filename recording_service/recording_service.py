# recording_service/models.py
from django.db import models

class Recording(models.Model):
    user_id = models.IntegerField()
    game_title = models.CharField(max_length=255)
    recording_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Recording {self.id} for user {self.user_id}'

# recording_service/serializers.py
from rest_framework import serializers
from .models import Recording

class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = '__all__'

# recording_service/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Recording
from .serializers import RecordingSerializer

class RecordingViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = RecordingSerializer(data=request.data)
        if serializer.is_valid():
            recording = serializer.save()
            return Response({'id': recording.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        recordings = Recording.objects.all()
        serializer = RecordingSerializer(recordings, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            recording = Recording.objects.get(pk=pk)
            serializer = RecordingSerializer(recording)
            return Response(serializer.data)
        except Recording.DoesNotExist:
            return Response({'error': 'Recording not found'}, status=status.HTTP_404_NOT_FOUND)

# recording_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecordingViewSet

router = DefaultRouter()
router.register(r'recordings', RecordingViewSet, basename='recording')

urlpatterns = [
    path('', include(router.urls)),
]

# recording_service/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Recording

class RecordingTests(APITestCase):
    def test_create_recording(self):
        url = '/recordings/'
        data = {'user_id': 1, 'game_title': 'Test Game', 'recording_data': 'some_data'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recording.objects.count(), 1)
        self.assertEqual(Recording.objects.get().game_title, 'Test Game')

    def test_list_recordings(self):
        Recording.objects.create(user_id=1, game_title='Test Game', recording_data='some_data')
        url = '/recordings/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_recording(self):
        recording = Recording.objects.create(user_id=1, game_title='Test Game', recording_data='some_data')
        url = f'/recordings/{recording.id}/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['game_title'], 'Test Game')

    def test_retrieve_nonexistent_recording(self):
        url = '/recordings/999/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)