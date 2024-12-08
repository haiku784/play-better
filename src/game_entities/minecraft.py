from game_entity import GameEntity

class Minecraft(GameEntity):
    def __init__(self, title, release_year, platform):
        super().__init__(title, 'Sandbox', release_year)
        self.platform = platform  # Platform (e.g., PC, Console)

    def get_info(self):
        base_info = super().get_info()
        return f'{base_info} - Platform: {self.platform}'
