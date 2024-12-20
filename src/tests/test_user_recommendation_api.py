import pytest
from fastapi.testclient import TestClient
from src.api.user_recommendation_api import app

client = TestClient(app)

@pytest.fixture
def mock_user_recommendations():
    return [{'recommended_item': 'Game A'}, {'recommended_item': 'Game B'}]

def test_get_user_recommendations(monkeypatch, mock_user_recommendations):
    # Mock the database query to return mock recommendations
    def mock_get_recommendations(user_id):
        return mock_user_recommendations

    monkeypatch.setattr('src.api.user_recommendation_api.get_user_recommendations', mock_get_recommendations)

    response = client.get('/api/recommendations/user/1')
    assert response.status_code == 200
    assert response.json() == mock_user_recommendations


def test_get_recommendations_not_found():
    response = client.get('/api/recommendations/user/999')
    assert response.status_code == 404