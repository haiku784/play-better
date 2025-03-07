from django.db import models

class HardwareRecommendation(models.Model):
    hardware_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255)
    compatibility_details = models.TextField()
    purchase_links = models.URLField()

    def __str__(self):
        return f'{self.type} - {self.compatibility_details}'


class ConfigRecommendation(models.Model):
    game_title = models.CharField(max_length=255)
    sensitivity_settings = models.JSONField()
    graphics_settings = models.JSONField()

    def __str__(self):
        return f'{self.game_title} Configuration'


class RecommendationService:
    """
    Service class for generating hardware and configuration recommendations.
    """

    @staticmethod
    def generate_hardware_recommendations(user_preferences):
        """
        Generate hardware recommendations based on user preferences.
        
        :param user_preferences: dict containing user preferences
        :return: list of HardwareRecommendation objects
        """
        # Example logic for generating recommendations
        recommendations = HardwareRecommendation.objects.filter(
            compatibility_details__icontains=user_preferences['preferredBrands']
        )
        return recommendations

    @staticmethod
    def generate_config_recommendations(game_title):
        """
        Generate configuration recommendations for a specific game.
        
        :param game_title: str title of the game
        :return: ConfigRecommendation object
        """
        recommendation = ConfigRecommendation.objects.filter(game_title=game_title).first()
        return recommendation


# Django views
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

class HardwareRecommendationViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving hardware recommendations.
    """

    def list(self, request):
        """
        List all hardware recommendations.
        """
        recommendations = HardwareRecommendation.objects.all()
        return Response([str(rec) for rec in recommendations])

    def retrieve(self, request, pk=None):
        """
        Retrieve a hardware recommendation by its ID.
        
        :param pk: int primary key of the recommendation
        :return: Response with recommendation details
        """
        try:
            recommendation = HardwareRecommendation.objects.get(pk=pk)
            return Response(str(recommendation))
        except HardwareRecommendation.DoesNotExist:
            return Response({'error': 'Recommendation not found'}, status=status.HTTP_404_NOT_FOUND)


class ConfigRecommendationViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving configuration recommendations.
    """

    def list(self, request):
        """
        List all configuration recommendations.
        """
        recommendations = ConfigRecommendation.objects.all()
        return Response([str(rec) for rec in recommendations])

    def retrieve(self, request, game_title=None):
        """
        Retrieve a configuration recommendation by game title.
        
        :param game_title: str title of the game
        :return: Response with recommendation details
        """
        recommendation = ConfigRecommendation.objects.filter(game_title=game_title).first()
        if recommendation:
            return Response(str(recommendation))
        return Response({'error': 'Recommendation not found'}, status=status.HTTP_404_NOT_FOUND)


# Django URLs
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'hardware-recommendations', HardwareRecommendationViewSet, basename='hardware-recommendation')
router.register(r'config-recommendations', ConfigRecommendationViewSet, basename='config-recommendation')

urlpatterns = [
    path('', include(router.urls)),
]

# Unit Tests
from django.test import TestCase
from .models import HardwareRecommendation, ConfigRecommendation

class RecommendationServiceTests(TestCase):
    def setUp(self):
        HardwareRecommendation.objects.create(type='GPU', compatibility_details='NVIDIA RTX 3080', purchase_links='http://example.com')
        ConfigRecommendation.objects.create(game_title='Game A', sensitivity_settings={'x': 1.5}, graphics_settings={'quality': 'high'})

    def test_generate_hardware_recommendations(self):
        recommendations = RecommendationService.generate_hardware_recommendations({'preferredBrands': 'NVIDIA'})
        self.assertGreater(len(recommendations), 0)

    def test_generate_config_recommendations(self):
        recommendation = RecommendationService.generate_config_recommendations('Game A')
        self.assertIsNotNone(recommendation)
        self.assertEqual(recommendation.game_title, 'Game A')
