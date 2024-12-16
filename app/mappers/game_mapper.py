from typing import List, Dict

# Define a class to represent the internal game data model
class Game:
    def __init__(self, id: int, title: str, genre: str, release_date: str):
        self.id = id
        self.title = title
        self.genre = genre
        self.release_date = release_date

# Function to map API response to internal Game data model

def map_game_data(api_response: List[Dict]) -> List[Game]:
    """Maps the fetched game data from the API to internal Game model.

    Args:
        api_response (List[Dict]): The raw data fetched from the game API.

    Returns:
        List[Game]: A list of Game objects mapped from API data.
    """
    mapped_games = []
    for item in api_response:
        # Map each item to the Game model
        game = Game(
            id=item['id'],
            title=item['title'],
            genre=item['genre'],
            release_date=item['release_date']
        )
        mapped_games.append(game)
    return mapped_games

# Example usage of the mapping function
# api_data = fetch_game_data()  # This function would fetch data from the API
# games = map_game_data(api_data)
