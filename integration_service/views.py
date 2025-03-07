from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import IntegrationService
from .serializers import GamePlatformSerializer
from rest_framework.permissions import IsAuthenticated

class IntegrationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List all game platforms for the authenticated user."""
        service = IntegrationService(user=request.user)
        platforms = service.list_platforms()
        serializer = GamePlatformSerializer(platforms, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Add a new game platform for the authenticated user."""
        serializer = GamePlatformSerializer(data=request.data)
        if serializer.is_valid():
            service = IntegrationService(user=request.user)
            platform = service.add_platform(serializer.validated_data['name'], serializer.validated_data['integration_data'])
            return Response(GamePlatformSerializer(platform).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, platform_id):
        """Remove a game platform by ID for the authenticated user."""
        service = IntegrationService(user=request.user)
        if service.remove_platform(platform_id):
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Platform not found.'}, status=status.HTTP_404_NOT_FOUND)