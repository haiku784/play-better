from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .schemas import UserProfileSerializer

class UserPreferencesView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # Get the user profile for the authenticated user
        return self.get_queryset().get(user=self.request.user)