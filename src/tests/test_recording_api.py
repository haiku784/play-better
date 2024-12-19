from fastapi.testclient import TestClient
from src.api.recording_api import app

client = TestClient(app)

def test_create_recording():
    response = client.post("/recordings/", json={"id": 1, "data": "test data"})
    assert response.status_code == 200
    assert response.json() == {"id": 1, "data": "test data"}


def test_read_recording():
    client.post("/recordings/", json={"id": 1, "data": "test data"})
    response = client.get("/recordings/1")
    assert response.status_code == 200
    assert response.json() == {"id": 1, "data": "test data"}
