class GameplayStyle:
    """
    A class to represent user gameplay style, including aggression, strategy, and teamwork.
    """
    def __init__(self, aggression, strategy, teamwork):
        self.aggression = aggression  # Scale of 1 to 10
        self.strategy = strategy      # Scale of 1 to 10
        self.teamwork = teamwork      # Scale of 1 to 10

    def get_style_summary(self):
        return {
            'aggression': self.aggression,
            'strategy': self.strategy,
            'teamwork': self.teamwork
        }

    def __repr__(self):
        return f"GameplayStyle(aggression={self.aggression}, strategy={self.strategy}, teamwork={self.teamwork})"
