# analysis_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnalysisViewSet

router = DefaultRouter()
router.register(r'performance-metrics', AnalysisViewSet, basename='performance-metric')

urlpatterns = [
    path('', include(router.urls)),
]