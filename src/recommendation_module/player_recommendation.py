from models.player import Player
import json

# Load criteria from JSON file

def load_criteria_from_json(file_path):
    with open(file_path, 'r') as json_file:
        criteria = json.load(json_file)
    return criteria

# Recommend players based on defined criteria

def recommend_players(players, criteria):
    recommended = []
    for player in players:
        if (criteria['skill_level'][0] <= player.skill_level <= criteria['skill_level'][1] and
            criteria['win_rate'][0] <= player.win_rate <= criteria['win_rate'][1] and
            criteria['popularity'][0] <= player.popularity <= criteria['popularity'][1]):
            recommended.append(player)
    return recommended

# Example usage
if __name__ == '__main__':
    criteria = load_criteria_from_json('src/recommendation_module/criteria.json')
    player1 = Player('Alice', 3, 75, 85)
    player2 = Player('Bob', 2, 60, 70)
    player3 = Player('Charlie', 5, 90, 95)
    players = [player1, player2, player3]
    recommended_players = recommend_players(players, criteria)
    for player in recommended_players:
        print(player)