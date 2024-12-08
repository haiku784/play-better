class GameEntity:
    def __init__(self, title, genre, release_year):
        self.title = title  # Title of the game
        self.genre = genre  # Genre of the game
        self.release_year = release_year  # Release year of the game

    def get_info(self):
        return f'{self.title} ({self.release_year}) - Genre: {self.genre}'
