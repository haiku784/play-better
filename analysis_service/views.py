# analysis_service/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import PerformanceMetric
from .serializers import PerformanceMetricSerializer

class AnalysisViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = PerformanceMetricSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        metrics = PerformanceMetric.objects.all()
        serializer = PerformanceMetricSerializer(metrics, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            metric = PerformanceMetric.objects.get(pk=pk)
            serializer = PerformanceMetricSerializer(metric)
            return Response(serializer.data)
        except PerformanceMetric.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)