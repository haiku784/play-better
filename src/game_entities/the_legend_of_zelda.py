from game_entity import GameEntity

class TheLegendofZelda(GameEntity):
    def __init__(self, title, release_year, main_character):
        super().__init__(title, 'Action-Adventure', release_year)
        self.main_character = main_character  # Main character in the game

    def get_info(self):
        base_info = super().get_info()
        return f'{base_info} - Main Character: {self.main_character}'
