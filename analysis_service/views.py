# analysis_service/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import PerformanceMetrics, GameplaySession
from .serializers import PerformanceMetricsSerializer, GameplaySessionSerializer

class PerformanceMetricsViewSet(viewsets.ModelViewSet):
    queryset = PerformanceMetrics.objects.all()
    serializer_class = PerformanceMetricsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GameplaySessionViewSet(viewsets.ModelViewSet):
    queryset = GameplaySession.objects.all()
    serializer_class = GameplaySessionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)