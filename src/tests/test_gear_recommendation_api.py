from fastapi.testclient import TestClient
from .gear_recommendation_api import router

client = TestClient(router)

def test_get_gear_recommendations():
    response = client.post("/recommendations", json={"user_id": 1, "preferences": {}})
    assert response.status_code == 200
    assert "recommendations" in response.json()