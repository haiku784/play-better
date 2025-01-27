import pytest
from fastapi.testclient import TestClient
from api.event_highlight_service import app

client = TestClient(app)

def test_extract_highlights():
    response = client.post('/highlights/extract', json={
        "match_id": "match_123",
        "game_data": {
            "events": [
                {"type": "kill", "player_id": "p1", "timestamp": 12.3},
                {"type": "objective", "player_id": "p2", "timestamp": 15.6}
            ],
            "players": {},
            "timestamps": []
        }
    })
    assert response.status_code == 200
    assert "highlights" in response.json()  
    assert "summary" in response.json()