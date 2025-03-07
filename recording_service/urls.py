# recording_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameplaySessionViewSet

router = DefaultRouter()
router.register(r'gameplay_sessions', GameplaySessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]