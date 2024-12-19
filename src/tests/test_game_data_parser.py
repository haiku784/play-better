from fastapi.testclient import TestClient
from src.main import app
import pytest

client = TestClient(app)

@pytest.mark.parametrize("player_id, score, level, timestamp", [
    ("player1", 100, 1, "2023-10-01T12:00:00Z"),
    ("player2", 150, 2, "2023-10-01T12:05:00Z")
])
def test_parse_and_store_gameplay_data(player_id, score, level, timestamp):
    response = client.post("/gameplay-data/", json={
        "player_id": player_id,
        "score": score,
        "level": level,
        "timestamp": timestamp
    })
    assert response.status_code == 200
    assert response.json() == {
        "player_id": player_id,
        "score": score,
        "level": level,
        "timestamp": timestamp
    }