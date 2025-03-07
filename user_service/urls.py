from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, GameplaySessionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'gameplay_sessions', GameplaySessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]