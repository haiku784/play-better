import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_game_stats_success():
    """
    Test the successful retrieval of game stats for an existing player.
    """ 
    response = client.get('/api/game-stats/existing_player_id')
    assert response.status_code == 200
    assert "player_stats" in response.json()  # Assuming the response contains player_stats key


def test_get_game_stats_not_found():
    """
    Test the retrieval of game stats for a non-existing player.
    """ 
    response = client.get('/api/game-stats/non_existing_player_id')
    assert response.status_code == 404
    assert "Player not found" in response.json().get("detail")


def test_get_game_stats_error():
    """
    Simulate an error when calling the external API.
    """ 
    # Here you might want to mock the httpx client to simulate errors.
    # This can be done using unittest.mock or similar libraries.
    pass  # Implement error handling test case as needed.