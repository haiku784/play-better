# models.py
from django.db import models

class Recording(models.Model):
    recording_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    game_title = models.CharField(max_length=255)
    platform = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    duration = models.DurationField()
    file_format = models.CharField(max_length=10)
    file_path = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.game_title} - {self.date}'


# serializers.py
from rest_framework import serializers
from .models import Recording

class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = '__all__'


# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Recording
from .serializers import RecordingSerializer

class RecordingViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = RecordingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            recording = Recording.objects.get(pk=pk)
            serializer = RecordingSerializer(recording, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Recording.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            recording = Recording.objects.get(pk=pk)
            recording.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Recording.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecordingViewSet

router = DefaultRouter()
router.register(r'recordings', RecordingViewSet, basename='recording')

urlpatterns = [
    path('', include(router.urls)),
]


# tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Recording

class RecordingTests(APITestCase):
    def test_create_recording(self):
        url = reverse('recording-list')
        data = {
            'user_id': 1,
            'game_title': 'Game A',
            'platform': 'PC',
            'duration': '00:30:00',
            'file_format': 'mp4',
            'file_path': '/path/to/recording.mp4'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_recordings(self):
        url = reverse('recording-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_recording(self):
        recording = Recording.objects.create(
            user_id=1,
            game_title='Game A',
            platform='PC',
            duration='00:30:00',
            file_format='mp4',
            file_path='/path/to/recording.mp4'
        )
        url = reverse('recording-detail', args=[recording.recording_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_recording(self):
        recording = Recording.objects.create(
            user_id=1,
            game_title='Game A',
            platform='PC',
            duration='00:30:00',
            file_format='mp4',
            file_path='/path/to/recording.mp4'
        )
        url = reverse('recording-detail', args=[recording.recording_id])
        data = {'game_title': 'Game B'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_recording(self):
        recording = Recording.objects.create(
            user_id=1,
            game_title='Game A',
            platform='PC',
            duration='00:30:00',
            file_format='mp4',
            file_path='/path/to/recording.mp4'
        )
        url = reverse('recording-detail', args=[recording.recording_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)