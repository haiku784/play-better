from fastapi.testclient import TestClient
from .gaming_preferences_api import app

client = TestClient(app)

def test_submit_gaming_preferences():
    response = client.post('/api/gaming-preferences', json={'game_title': 'Game A', 'play_style': 'Aggressive', 'budget': 50})
    assert response.status_code == 200
    assert response.json() == {'message': 'Preferences submitted successfully.'}


def test_submit_invalid_budget():
    response = client.post('/api/gaming-preferences', json={'game_title': 'Game A', 'play_style': 'Aggressive', 'budget': -10})
    assert response.status_code == 422


def test_submit_missing_fields():
    response = client.post('/api/gaming-preferences', json={})
    assert response.status_code == 422
