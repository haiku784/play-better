# analysis_service/models.py
from django.db import models

class PerformanceMetrics(models.Model):
    kills = models.IntegerField(default=0)
    deaths = models.IntegerField(default=0)
    assists = models.IntegerField(default=0)
    accuracy = models.FloatField(default=0.0)
    gameplay_session = models.ForeignKey('GameplaySession', on_delete=models.CASCADE)

    def __str__(self):
        return f"PerformanceMetrics(kills={self.kills}, deaths={self.deaths}, assists={self.assists}, accuracy={self.accuracy})"

class GameplaySession(models.Model):
    session_id = models.CharField(max_length=255, unique=True)
    game_title = models.CharField(max_length=255)
    duration = models.IntegerField()
    recorded_data = models.BinaryField()

    def __str__(self):
        return f"GameplaySession(session_id={self.session_id}, game_title={self.game_title})