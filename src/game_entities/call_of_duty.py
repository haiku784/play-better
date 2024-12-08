from game_entity import GameEntity

class CallOfDuty(GameEntity):
    def __init__(self, title, release_year, edition):
        super().__init__(title, 'FPS', release_year)
        self.edition = edition  # Specific edition (e.g., Modern Warfare)

    def get_info(self):
        base_info = super().get_info()
        return f'{base_info} - Edition: {self.edition}'
