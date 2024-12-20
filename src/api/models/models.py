from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    preferred_genres = models.JSONField(default=list)  # Stores user preferred game genres
    play_style = models.CharField(max_length=255)  # Example: Aggressive, Defensive

    def __str__(self):
        return f"{self.user.username}'s Profile