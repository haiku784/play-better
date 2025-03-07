# gateway_service/models.py
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

class Recording(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game_title = models.CharField(max_length=255)
    recording_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.game_title} - {self.user.username}'

# gateway_service/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User, Recording
from .serializers import UserSerializer, RecordingSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RecordingViewSet(viewsets.ModelViewSet):
    queryset = Recording.objects.all()
    serializer_class = RecordingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# gateway_service/serializers.py
from rest_framework import serializers
from .models import User, Recording

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = ['id', 'user', 'game_title', 'recording_data', 'created_at']

# gateway_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RecordingViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'recordings', RecordingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

# gateway_service/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Recording

class UserTests(APITestCase):
    def test_create_user(self):
        url = reverse('user-list')
        data = {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class RecordingTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', email='test@example.com', password='testpass')

    def test_create_recording(self):
        url = reverse('recording-list')
        data = {'user': self.user.id, 'game_title': 'Test Game', 'recording_data': 'data'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
