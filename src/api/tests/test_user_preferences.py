from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserProfile

class UserPreferencesTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')
        self.profile = UserProfile.objects.create(user=self.user, preferred_genres=['Action'], play_style='Aggressive')

    def test_get_user_preferences(self):
        url = reverse('userprofile-list')  # Adjust based on your URLs
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['play_style'], 'Aggressive')