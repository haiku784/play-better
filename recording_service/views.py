# recording_service/views.py
from rest_framework import viewsets
from .models import GameplaySession
from .serializers import GameplaySessionSerializer

class GameplaySessionViewSet(viewsets.ModelViewSet):
    queryset = GameplaySession.objects.all()
    serializer_class = GameplaySessionSerializer
