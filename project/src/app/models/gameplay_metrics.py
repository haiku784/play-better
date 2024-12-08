from django.db import models

class GameplayMetrics(models.Model):
    player_id = models.IntegerField()
    score = models.IntegerField()
    level_reached = models.IntegerField()
    duration_played = models.DurationField()
    date_played = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Gameplay Metrics'

    def __str__(self):
        return f'GameplayMetrics(player_id={self.player_id}, score={self.score})'