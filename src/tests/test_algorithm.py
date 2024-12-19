from fastapi.testclient import TestClient
from src.main import app
from src.models.algorithm import Algorithm

client = TestClient(app)

def test_create_algorithm():
    response = client.post("/algorithms/", json={
        "name": "collaborative_filtering",
        "function": "function_placeholder"
    })
    assert response.status_code == 200
    assert response.json()["name"] == "collaborative_filtering