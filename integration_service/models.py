from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

class GamePlatform(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game_platforms')
    integration_data = models.JSONField()  # Store integration data as JSON

    def __str__(self):
        return self.name

class IntegrationService:
    def __init__(self, user: User):
        self.user = user

    def add_platform(self, platform_name: str, integration_data: dict) -> GamePlatform:
        """Add a new game platform for the user.
        
        Args:
            platform_name (str): The name of the game platform.
            integration_data (dict): The integration data for the platform.

        Returns:
            GamePlatform: The created GamePlatform instance.
        """
        platform = GamePlatform.objects.create(name=platform_name, user=self.user, integration_data=integration_data)
        return platform

    def remove_platform(self, platform_id: int) -> bool:
        """Remove a game platform by ID.
        
        Args:
            platform_id (int): The ID of the platform to remove.

        Returns:
            bool: True if the platform was removed, False otherwise.
        """
        try:
            platform = GamePlatform.objects.get(id=platform_id, user=self.user)
            platform.delete()
            return True
        except GamePlatform.DoesNotExist:
            return False

    def list_platforms(self) -> list:
        """List all game platforms for the user.
        
        Returns:
            list: A list of GamePlatform instances.
        """
        return self.user.game_platforms.all()