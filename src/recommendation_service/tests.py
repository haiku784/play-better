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
