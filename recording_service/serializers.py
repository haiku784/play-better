# recording_service/serializers.py
from rest_framework import serializers
from .models import GameplaySession

class GameplaySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameplaySession
        fields = '__all__'
