# notification/models.py
from django.db import models

class Notification(models.Model):
    user_id = models.IntegerField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification {self.id} for User {self.user_id}'

# notification/serializers.py
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# notification/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        notifications = Notification.objects.filter(user_id=request.query_params.get('user_id'))
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            notification = Notification.objects.get(pk=pk)
            serializer = NotificationSerializer(notification)
            return Response(serializer.data)
        except Notification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            notification = Notification.objects.get(pk=pk)
            notification.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Notification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# notification/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet

router = DefaultRouter()
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
]

# notification/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Notification

class NotificationTests(APITestCase):
    def test_create_notification(self):
        response = self.client.post('/notifications/', {'user_id': 1, 'message': 'Test notification'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(Notification.objects.get().message, 'Test notification')

    def test_list_notifications(self):
        Notification.objects.create(user_id=1, message='Test notification 1')
        Notification.objects.create(user_id=1, message='Test notification 2')
        response = self.client.get('/notifications/?user_id=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_delete_notification(self):
        notification = Notification.objects.create(user_id=1, message='Test notification')
        response = self.client.delete(f'/notifications/{notification.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Notification.objects.count(), 0)