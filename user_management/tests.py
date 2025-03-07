# user_management/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User

class UserManagementTests(APITestCase):
    def test_create_user(self):
        url = reverse('user-list')
        data = {'username': 'testuser', 'password': 'testpass', 'email': 'test@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_user(self):
        user = User.objects.create(username='testuser', password='testpass', email='test@example.com')
        url = reverse('user-detail', args=[user.id])
        data = {'preferences': {'theme': 'dark'}}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertEqual(user.preferences, {'theme': 'dark'})