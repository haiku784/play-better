import pytest
from fastapi.testclient import TestClient
from api.match_data_collector import app

client = TestClient(app)

def test_collect_match_data():
    response = client.post('/api/matchdata/collect', json={
        "match_id": "match123",
        "player_stats": [{"player_id": "player1", "score": 10, "assists": 2}],
        "game_events": [{"event_type": "goal", "timestamp": "2025-01-27T09:20:00"}],
        "timestamp": "2025-01-27T09:20:00"
    })
    assert response.status_code == 200
    assert response.json()['status'] == "success"


def test_retrieve_match_data():
    # First, collect the data
    client.post('/api/matchdata/collect', json={
        "match_id": "match123",
        "player_stats": [{"player_id": "player1", "score": 10, "assists": 2}],
        "game_events": [{"event_type": "goal", "timestamp": "2025-01-27T09:20:00"}],
        "timestamp": "2025-01-27T09:20:00"
    })
    # Now retrieve it
    response = client.get('/api/matchdata/retrieve?match_id=match123')
    assert response.status_code == 200
    assert response.json()['match_id'] == "match123"
