# recommendation_service/models.py
from django.db import models

class GearRecommendation(models.Model):
    user_id = models.IntegerField()
    gear_type = models.CharField(max_length=100)
    recommendation_details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Recommendation for User {self.user_id} - {self.gear_type}'

# recommendation_service/serializers.py
from rest_framework import serializers
from .models import GearRecommendation

class GearRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GearRecommendation
        fields = '__all__'

# recommendation_service/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import GearRecommendation
from .serializers import GearRecommendationSerializer

class RecommendationViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = GearRecommendationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        recommendations = GearRecommendation.objects.all()
        serializer = GearRecommendationSerializer(recommendations, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            recommendation = GearRecommendation.objects.get(pk=pk)
            serializer = GearRecommendationSerializer(recommendation)
            return Response(serializer.data)
        except GearRecommendation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# recommendation_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecommendationViewSet

router = DefaultRouter()
router.register(r'recommendations', RecommendationViewSet, basename='recommendation')

urlpatterns = [
    path('', include(router.urls)),
]

# recommendation_service/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import GearRecommendation

class RecommendationTests(APITestCase):
    def test_create_recommendation(self):
        url = reverse('recommendation-list')
        data = {'user_id': 1, 'gear_type': 'Mouse', 'recommendation_details': 'High precision gaming mouse.'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GearRecommendation.objects.count(), 1)
        self.assertEqual(GearRecommendation.objects.get().gear_type, 'Mouse')

    def test_list_recommendations(self):
        url = reverse('recommendation-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_recommendation(self):
        recommendation = GearRecommendation.objects.create(user_id=1, gear_type='Keyboard', recommendation_details='Mechanical keyboard.')
        url = reverse('recommendation-detail', args=[recommendation.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['gear_type'], 'Keyboard')

    def test_retrieve_nonexistent_recommendation(self):
        url = reverse('recommendation-detail', args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)