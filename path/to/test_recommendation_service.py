# Unit Tests for Recommendation Service

from django.test import TestCase
from .models import Gear, Configuration, Recommendation

class RecommendationModelTests(TestCase):
    def setUp(self):
        self.gear = Gear.objects.create(name='Pro Gaming Mouse', type='Mouse', description='High precision gaming mouse')
        self.config = Configuration.objects.create(name='Default Config', settings={'sensitivity': 800, 'dpi': 16000})

    def test_create_recommendation(self):
        recommendation = Recommendation.objects.create(user_id=1, gear=self.gear, configuration=self.config)
        self.assertEqual(recommendation.user_id, 1)
        self.assertEqual(recommendation.gear, self.gear)
        self.assertEqual(recommendation.configuration, self.config)

    def test_string_representation(self):
        recommendation = Recommendation.objects.create(user_id=1, gear=self.gear, configuration=self.config)
        self.assertEqual(str(recommendation), 'Recommendation for User 1')