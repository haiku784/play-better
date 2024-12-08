class Player:
    def __init__(self, name, skill_level, win_rate, popularity):
        self.name = name  # Player's name
        self.skill_level = skill_level  # Player's skill level
        self.win_rate = win_rate  # Player's win rate
        self.popularity = popularity  # Player's popularity

    def __str__(self):
        return f'Player(name={self.name}, skill_level={self.skill_level}, win_rate={self.win_rate}, popularity={self.popularity})'