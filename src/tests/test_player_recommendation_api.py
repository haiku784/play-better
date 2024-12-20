from fastapi.testclient import TestClient
from src.api.player_recommendation_api import app

client = TestClient(app)

def test_get_recommendations_valid_user():
    response = client.get("/recommendations/1")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_get_recommendations_invalid_user():
    response = client.get("/recommendations/999")
    assert response.status_code == 404
    assert response.json() == {'detail': 'User not found'}
