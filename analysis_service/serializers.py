# analysis_service/serializers.py
from rest_framework import serializers
from .models import PerformanceMetrics, GameplaySession

class PerformanceMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceMetrics
        fields = '__all__'

class GameplaySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameplaySession
        fields = '__all__'