from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_record_gameplay():
    response = client.post("/api/gameplay/record", json={
        "player_id": "player123",
        "score": 200,
        "level": 5,
        "actions": ["jump", "shoot"]
    })
    assert response.status_code == 200
    assert response.json() == {"message": "Gameplay data received", "data": {"player_id": "player123", "score": 200, "level": 5, "actions": ["jump", "shoot"]}}