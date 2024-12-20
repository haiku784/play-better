from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserProfile

class UserProfileTests(APITestCase):
    def setUp(self):
        # Create a user to associate with the profile
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')

    def test_create_user_profile(self):
        # Test the creation of a user profile
        url = reverse('userprofile-list')  # Adjust based on your URLs
        data = {'preferred_genres': ['Action', 'Adventure'], 'play_style': 'Aggressive'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(UserProfile.objects.get().play_style, 'Aggressive')