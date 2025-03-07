# models.py
from django.db import models

class Recommendation(models.Model):
    user_id = models.IntegerField()
    type = models.CharField(max_length=100)
    details = models.TextField()
    rating = models.FloatField()
    review = models.TextField(blank=True)

    def __str__(self):
        return f'Recommendation {self.id} for User {self.user_id}'

# serializers.py
from rest_framework import serializers
from .models import Recommendation

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'

# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Recommendation
from .serializers import RecommendationSerializer

class RecommendationViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = RecommendationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        recommendations = Recommendation.objects.all()
        serializer = RecommendationSerializer(recommendations, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            recommendation = Recommendation.objects.get(pk=pk)
            serializer = RecommendationSerializer(recommendation)
            return Response(serializer.data)
        except Recommendation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            recommendation = Recommendation.objects.get(pk=pk)
            serializer = RecommendationSerializer(recommendation, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Recommendation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            recommendation = Recommendation.objects.get(pk=pk)
            recommendation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Recommendation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecommendationViewSet

router = DefaultRouter()
router.register(r'recommendations', RecommendationViewSet, basename='recommendation')

urlpatterns = [
    path('', include(router.urls)),
]

# tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Recommendation

class RecommendationTests(APITestCase):
    def test_create_recommendation(self):
        url = reverse('recommendation-list')
        data = {'user_id': 1, 'type': 'Gear', 'details': 'High-end gaming mouse', 'rating': 4.5}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_recommendations(self):
        url = reverse('recommendation-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_recommendation(self):
        recommendation = Recommendation.objects.create(user_id=1, type='Gear', details='High-end gaming mouse', rating=4.5)
        url = reverse('recommendation-detail', args=[recommendation.id])
        data = {'user_id': 1, 'type': 'Gear', 'details': 'Updated gaming mouse', 'rating': 5.0}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_recommendation(self):
        recommendation = Recommendation.objects.create(user_id=1, type='Gear', details='High-end gaming mouse', rating=4.5)
        url = reverse('recommendation-detail', args=[recommendation.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)