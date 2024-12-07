import json
from typing import List, Dict

class ProPlayer:
    def __init__(self, name: str, game_style: str, rank: str):
        self.name = name
        self.game_style = game_style
        self.rank = rank

class PlayerRecommendationService:
    def __init__(self):
        self.players = []

    def add_player(self, player: ProPlayer):
        self.players.append(player)

    def recommend_players(self, user_game_style: str) -> List[Dict]:
        recommendations = [player.__dict__ for player in self.players if player.game_style.lower() == user_game_style.lower()]
        return recommendations


# Example Usage:
if __name__ == '__main__':
    service = PlayerRecommendationService()
    service.add_player(ProPlayer('ProGamer1', 'Aggressive', 'Grandmaster'))
    service.add_player(ProPlayer('ProGamer2', 'Defensive', 'Master'))
    user_style = 'Aggressive'
    recommended = service.recommend_players(user_style)
    print(json.dumps(recommended, indent=2))
