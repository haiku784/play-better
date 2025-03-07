from django.test import TestCase
from .models import User, GameplaySession

class UserModelTest(TestCase):
    """
    Test cases for User model.
    """
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_user_creation(self):
        """
        Test if user is created successfully.
        """
        self.assertEqual(self.user.username, 'testuser')

    def test_update_preferences(self):
        """
        Test updating user preferences.
        """
        self.user.update_preferences({'gaming_style': 'aggressive'})
        self.assertIn('gaming_style', self.user.preferences)

class GameplaySessionModelTest(TestCase):
    """
    Test cases for GameplaySession model.
    """
    def setUp(self):
        self.session = GameplaySession.objects.create(game_title='Test Game', recording_data='data')

    def test_session_creation(self):
        """
        Test if gameplay session is created successfully.
        """
        self.assertEqual(self.session.game_title, 'Test Game')