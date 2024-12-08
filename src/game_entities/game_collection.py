class GameCollection:
    def __init__(self):
        self.games = []  # List to hold game entities

    def add_game(self, game):
        self.games.append(game)  # Add game to the collection

    def show_games(self):
        for game in self.games:
            print(game.get_info())  # Print info of each game
