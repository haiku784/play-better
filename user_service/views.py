from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import User, GameplaySession
from .serializers import UserSerializer, GameplaySessionSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        """
        Update user preferences.
        :param request: HTTP request containing user data
        :return: Response object
        """
        user = self.get_object()
        user.update_preferences(request.data.get('preferences', {}))
        return Response(user.get_user_data(), status=status.HTTP_200_OK)

class GameplaySessionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing gameplay sessions.
    """
    queryset = GameplaySession.objects.all()
    serializer_class = GameplaySessionSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new gameplay session.
        :param request: HTTP request containing session data
        :return: Response object
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)