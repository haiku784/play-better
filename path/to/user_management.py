# user_management/models.py
from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    preferences = models.JSONField(default=dict)
    recorded_plays = models.JSONField(default=list)

    def __str__(self):
        return self.username

# user_management/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'username', 'preferences', 'recorded_plays']

# user_management/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            return Response(UserSerializer(user).data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response(UserSerializer(user).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# user_management/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]

# user_management/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User

class UserManagementTests(APITestCase):
    def test_create_user(self):
        url = '/users/'  # Adjust based on your URL configuration
        data = {'username': 'testuser', 'preferences': {}, 'recorded_plays': []}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_user(self):
        user = User.objects.create(username='testuser')
        url = f'/users/{user.user_id}/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        user = User.objects.create(username='testuser')
        url = f'/users/{user.user_id}/'
        data = {'username': 'updateduser', 'preferences': {}, 'recorded_plays': []}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        user = User.objects.create(username='testuser')
        url = f'/users/{user.user_id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

# settings.py
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'user_management',
]  

# main urls.py
from django.urls import path, include

urlpatterns = [
    path('api/', include('user_management.urls')),
]  

# requirements.txt
Django>=3.2,<4.0
Django REST framework>=3.12,<4.0
psycopg2-binary>=2.9,<3.0

# To run the tests, use the command:
# python manage.py test user_management

# To create the database, run the following commands:
# python manage.py makemigrations
# python manage.py migrate
# python manage.py runserver

# API Endpoints
# Method: POST, Path: /api/users/  # Create a new user
# Method: GET, Path: /api/users/{user_id}/  # Retrieve a user by ID
# Method: PUT, Path: /api/users/{user_id}/  # Update a user by ID
# Method: DELETE, Path: /api/users/{user_id}/  # Delete a user by ID

# Note: Replace {user_id} with the actual user ID in the URL.