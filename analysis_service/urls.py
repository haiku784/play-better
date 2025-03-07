# analysis_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerformanceMetricsViewSet, GameplaySessionViewSet

router = DefaultRouter()
router.register(r'performance-metrics', PerformanceMetricsViewSet)
router.register(r'gameplay-sessions', GameplaySessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]