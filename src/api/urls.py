from django.urls import path
from .views import UserProfileView

urlpatterns = [
    path('create_profile/', UserProfileView.as_view(), name='create_profile'),
]