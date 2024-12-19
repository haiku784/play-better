from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_create_recording():
    response = client.post("/api/recordings/", json={
        "user_id": 1,
        "recording_id": "rec_001",
        "start_time": "2023-01-01T00:00:00Z",
        "end_time": "2023-01-01T01:00:00Z",
        "metadata": {}
    })
    assert response.status_code == 200
    assert response.json()["recording_id"] == "rec_001