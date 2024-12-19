from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)


def test_create_gameplay_statistics():
    response = client.post('/gameplay_statistics', json={
        'player_id': 'Player1',
        'game_id': 'Game1',
        'score': 50,
        'gameplay_time': 120,
        'levels_completed': 5
    })
    assert response.status_code == 200
    assert response.json() == {
        'player_id': 'Player1',
        'game_id': 'Game1',
        'score': 50,
        'gameplay_time': 120,
        'levels_completed': 5,
        'achievements': []
    }


def test_create_gameplay_statistics_invalid_score():
    response = client.post('/gameplay_statistics', json={
        'player_id': 'Player1',
        'game_id': 'Game1',
        'score': -10,
        'gameplay_time': 120,
        'levels_completed': 5
    })
    assert response.status_code == 422  # Unprocessable Entity
