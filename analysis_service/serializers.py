# analysis_service/serializers.py
from rest_framework import serializers
from .models import PerformanceMetric

class PerformanceMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceMetric
        fields = ['id', 'user_id', 'game_title', 'metrics', 'created_at']