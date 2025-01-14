import pytest
from fastapi.testclient import TestClient
from src.api.gear_recommendation_api import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_get_gear_recommendations():
    response = client.post('/recommend-gear', json={
        "user_id": "user123",
        "gameplay_metrics": {"kills": 10, "deaths": 2}
    })
    assert response.status_code == 200
    assert 'recommendations' in response.json()

@pytest.mark.asyncio
async def test_fetch_previous_recommendations():
    response = client.get('/get-recommendations/user123')
    assert response.status_code == 200
    assert isinstance(response.json(), list)