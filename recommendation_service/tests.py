# recommendation_service/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserPreferences, Recommendation

class RecommendationServiceTests(APITestCase):
    def setUp(self):
        self.user_pref = UserPreferences.objects.create(
            user_id='user123',
            preferred_hardware={'cpu': 'i7', 'gpu': 'RTX 3080'},
            preferred_game_config={'resolution': '1920x1080', 'fps': 60}
        )

    def test_create_user_preferences(self):
        url = '/user-preferences/'
        data = {
            'user_id': 'user456',
            'preferred_hardware': {'cpu': 'i5', 'gpu': 'GTX 1660'},
            'preferred_game_config': {'resolution': '1440x900', 'fps': 75}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_recommendation(self):
        url = '/recommendations/'
        data = {
            'user_preferences': self.user_pref.id,
            'hardware': {'cpu': 'i9', 'gpu': 'RTX 3090'},
            'game_config': {'resolution': '2560x1440', 'fps': 144}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)