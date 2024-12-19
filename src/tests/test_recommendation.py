from fastapi.testclient import TestClient
from src.main import app
from src.models.recommendation import Recommendation

client = TestClient(app)

def test_create_recommendation():
    response = client.post("/recommendations/", json={
        "id": 1,
        "score": 0.95,
        "items": ["item1", "item2"]
    })
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "score": 0.95,
        "items": ["item1", "item2"]
    }