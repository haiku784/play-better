# analysis_service/models.py
from django.db import models

class PerformanceMetric(models.Model):
    user_id = models.IntegerField()
    game_title = models.CharField(max_length=255)
    metrics = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"PerformanceMetric(user_id={self.user_id}, game_title={self.game_title})