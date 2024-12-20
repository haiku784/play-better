from rest_framework import generics
from .models import UserProfile
from .schemas import UserProfileSerializer

class UserProfileView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    
    def perform_create(self, serializer):
        # Automatically associate the profile with the user
        serializer.save(user=self.request.user)