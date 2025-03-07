from django.test import TestCase
from .models import User, GamePlatform
from rest_framework.test import APIClient
from rest_framework import status

class IntegrationServiceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.client.force_authenticate(user=self.user)

    def test_add_platform(self):
        response = self.client.post('/integrations/', {'name': 'Steam', 'integration_data': {'token': 'abc123'}})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GamePlatform.objects.count(), 1)

    def test_list_platforms(self):
        GamePlatform.objects.create(name='Steam', user=self.user, integration_data={'token': 'abc123'})
        response = self.client.get('/integrations/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_remove_platform(self):
        platform = GamePlatform.objects.create(name='Steam', user=self.user, integration_data={'token': 'abc123'})
        response = self.client.delete(f'/integrations/{platform.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(GamePlatform.objects.count(), 0)