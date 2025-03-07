# api_gateway/models.py
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    preferences = models.JSONField(default=dict)

    def __str__(self):
        return self.username


class GameplaySession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game_title = models.CharField(max_length=255)
    platform = models.CharField(max_length=50)
    duration = models.IntegerField()  # Duration in seconds

    def __str__(self):
        return f'{self.game_title} - {self.user.username}'


# api_gateway/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User, GameplaySession
from .serializers import UserSerializer, GameplaySessionSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GameplaySessionViewSet(viewsets.ModelViewSet):
    queryset = GameplaySession.objects.all()
    serializer_class = GameplaySessionSerializer


# api_gateway/serializers.py
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


# api_gateway/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, GameplaySessionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'sessions', GameplaySessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


# api_gateway/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, GameplaySession


class UserTests(APITestCase):
    def test_create_user(self):
        url = '/users/'  # Adjust based on your URL configuration
        data = {'username': 'testuser', 'email': 'test@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')


class GameplaySessionTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', email='test@example.com')

    def test_create_gameplay_session(self):
        url = '/sessions/'  # Adjust based on your URL configuration
        data = {'user': self.user.id, 'game_title': 'Test Game', 'platform': 'PC', 'duration': 3600}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GameplaySession.objects.count(), 1)
        self.assertEqual(GameplaySession.objects.get().game_title, 'Test Game')
