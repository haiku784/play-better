# notification/models.py
from django.db import models

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification {self.notification_id} for User {self.user_id}'

# notification/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            notification = serializer.save()
            return Response(NotificationSerializer(notification).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        notifications = Notification.objects.filter(user_id=request.query_params.get('user_id'))
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

# notification/serializers.py
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['notification_id', 'user_id', 'message', 'created_at']

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
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Notification

class NotificationTests(APITestCase):
    def test_create_notification(self):
        url = reverse('notification-list')
        data = {'user_id': 'user123', 'message': 'Test notification'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(Notification.objects.get().message, 'Test notification')

    def test_list_notifications(self):
        Notification.objects.create(user_id='user123', message='Test notification 1')
        Notification.objects.create(user_id='user123', message='Test notification 2')
        url = reverse('notification-list') + '?user_id=user123'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)