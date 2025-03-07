from django.urls import path
from .views import IntegrationView

urlpatterns = [
    path('integrations/', IntegrationView.as_view(), name='integration-list'),
    path('integrations/<int:platform_id>/', IntegrationView.as_view(), name='integration-detail'),
]