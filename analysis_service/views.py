# analysis_service/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from .models import PerformanceMetric
from .serializers import PerformanceMetricSerializer

class AnalysisServiceViewSet(viewsets.ViewSet):
    def analyze_session(self, request, session_id):
        try:
            metrics = PerformanceMetric.objects.filter(session_id=session_id)
            if not metrics:
                return Response({'error': 'No metrics found for this session.'}, status=404)
            # Perform analysis logic here
            return Response(PerformanceMetricSerializer(metrics, many=True).data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
