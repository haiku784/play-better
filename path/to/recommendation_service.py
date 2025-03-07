# Recommendation Service Microservice in Python + Django

# Import necessary libraries
from django.db import models
from django.http import JsonResponse
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Models
class Gear(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Configuration(models.Model):
    name = models.CharField(max_length=100)
    settings = models.JSONField()

    def __str__(self):
        return self.name

class Recommendation(models.Model):
    user_id = models.IntegerField()
    gear = models.ForeignKey(Gear, on_delete=models.CASCADE)
    configuration = models.ForeignKey(Configuration, on_delete=models.CASCADE)

    def __str__(self):
        return f'Recommendation for User {self.user_id}'

# Serializers
class GearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gear
        fields = '__all__'

class ConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields = '__all__'

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'

# Views
class RecommendationViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        """
        Create a new recommendation based on user preferences.
        
        Params:
        - request: The HTTP request containing user preferences.
        
        Returns:
        - JsonResponse: A response containing the created recommendation.
        """
        user_id = request.data.get('user_id')
        gear_id = request.data.get('gear_id')
        config_id = request.data.get('config_id')

        if not user_id or not gear_id or not config_id:
            return Response({'error': 'Missing parameters'}, status=status.HTTP_400_BAD_REQUEST)

        recommendation = Recommendation.objects.create(
            user_id=user_id,
            gear_id=gear_id,
            configuration_id=config_id
        )
        return Response(RecommendationSerializer(recommendation).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def list_recommendations(self, request):
        """
        List all recommendations for a user.
        
        Params:
        - request: The HTTP request containing user ID.
        
        Returns:
        - JsonResponse: A response containing the list of recommendations.
        """
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        recommendations = Recommendation.objects.filter(user_id=user_id)
        return Response(RecommendationSerializer(recommendations, many=True).data)

# URL Configuration
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'recommendations', RecommendationViewSet, basename='recommendation')

urlpatterns = [
    path('', include(router.urls)),
]