from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_submit_valid_preferences():
    response = client.post('/submit_preferences/', json={
        "user_id": "user123",
        "favorite_games": ["Game A", "Game B"],
        "play_style": "strategic",
        "budget": 50.0
    })
    assert response.status_code == 200
    assert response.json() == {'message': 'Preferences submitted successfully!'}


def test_submit_duplicate_user():
    # First submission should succeed
    client.post('/submit_preferences/', json={
        "user_id": "user123",
        "favorite_games": ["Game A", "Game B"],
        "play_style": "strategic",
        "budget": 50.0
    })
    # Second submission should fail
    response = client.post('/submit_preferences/', json={
        "user_id": "user123",
        "favorite_games": ["Game C"],
        "play_style": "aggressive",
        "budget": 60.0
    })
    assert response.status_code == 400
    assert response.json() == {'detail': 'User ID already exists.'}
