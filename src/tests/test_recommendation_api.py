from fastapi.testclient import TestClient
from src.api.main import app

client = TestClient(app)

def test_get_recommendations():
    response = client.get('/recommendations/1')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Summary: This unit test checks the API endpoint for fetching recommendations, verifying a successful response and proper JSON structure.