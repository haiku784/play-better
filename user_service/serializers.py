from rest_framework import serializers
from .models import User, GameplaySession

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'preferences', 'gameplay_sessions']

class GameplaySessionSerializer(serializers.ModelSerializer):
    """
    Serializer for GameplaySession model.
    """
    class Meta:
        model = GameplaySession
        fields = ['session_id', 'game_title', 'recording_data', 'performance_metrics']