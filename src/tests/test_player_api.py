import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_get_player_scores():
    player_id = "12345"
    response = client.get(f'/player_scores/{player_id}')
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # Additional checks can be added based on expected data structure
