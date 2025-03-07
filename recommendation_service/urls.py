# recommendation_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserPreferencesViewSet, RecommendationViewSet

router = DefaultRouter()
router.register(r'user-preferences', UserPreferencesViewSet)
router.register(r'recommendations', RecommendationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]