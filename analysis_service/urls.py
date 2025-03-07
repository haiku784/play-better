# analysis_service/urls.py
from django.urls import path
from .views import AnalysisServiceViewSet

urlpatterns = [
    path('analyze/<str:session_id>/', AnalysisServiceViewSet.as_view({'get': 'analyze_session'}), name='analyze_session'),
]