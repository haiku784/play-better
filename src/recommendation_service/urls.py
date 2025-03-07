from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HardwareRecommendationViewSet, ConfigRecommendationViewSet

router = DefaultRouter()
router.register(r'hardware-recommendations', HardwareRecommendationViewSet, basename='hardware-recommendation')
router.register(r'config-recommendations', ConfigRecommendationViewSet, basename='config-recommendation')

urlpatterns = [
    path('', include(router.urls)),
]