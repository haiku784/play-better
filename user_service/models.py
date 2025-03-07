from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    Custom User model that extends Django's AbstractUser.
    """
    preferences = models.JSONField(default=dict)
    gameplay_sessions = models.ManyToManyField('GameplaySession', related_name='users')

    def update_preferences(self, new_preferences):
        """
        Update user preferences.
        :param new_preferences: dict containing new preferences
        """
        self.preferences.update(new_preferences)
        self.save()

    def get_user_data(self):
        """
        Get user data including username and preferences.
        :return: dict containing user data
        """
        return {
            'username': self.username,
            'preferences': self.preferences,
        }

class GameplaySession(models.Model):
    """
    Model representing a gameplay session.
    """
    session_id = models.AutoField(primary_key=True)
    game_title = models.CharField(max_length=255)
    recording_data = models.TextField()
    performance_metrics = models.JSONField(default=dict)

    def start_recording(self):
        """
        Logic to start recording gameplay.
        """
        pass  # Implement recording logic here

    def stop_recording(self):
        """
        Logic to stop recording gameplay.
        """
        pass  # Implement stop logic here

    def save_recording(self):
        """
        Save the recording data to the database.
        """
        self.save()