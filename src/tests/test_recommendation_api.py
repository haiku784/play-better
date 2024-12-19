import pytest
from fastapi.testclient import TestClient
from .recommendation_api import app

# Initialize TestClient
client = TestClient(app)

# Test case for the recommendation endpoint
def test_generate_recommendations():
    response = client.post("/recommendations/", json={"user_id": 1, "activity": "play", "score": 80})
    assert response.status_code == 200
    assert response.json() == {"user_id": 1, "recommendations": ["Recommendation A"]}

# Test case for fetching behaviors
def test_get_behaviors():
    response = client.get("/behaviors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
