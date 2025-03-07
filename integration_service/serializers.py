from rest_framework import serializers
from .models import GamePlatform

class GamePlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamePlatform
        fields = ['id', 'name', 'integration_data']