# recommendation_service/models.py
from django.db import models

class UserPreferences(models.Model):
    user_id = models.CharField(max_length=255, unique=True)
    preferred_hardware = models.JSONField(default=dict)
    preferred_game_config = models.JSONField(default=dict)

    def __str__(self):
        return self.user_id

class Recommendation(models.Model):
    recommendation_id = models.AutoField(primary_key=True)
    user_preferences = models.ForeignKey(UserPreferences, on_delete=models.CASCADE)
    hardware = models.JSONField(default=dict)
    game_config = models.JSONField(default=dict)

    def __str__(self):
        return f'Recommendation for {self.user_preferences}'
