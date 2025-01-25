import pytest
from fastapi.testclient import TestClient
from app.apirecording_control import app

client = TestClient(app)

def test_analyze_player_metrics_valid():
    response = client.post('/metrics/player', json={
        'playerId': 'player123',
        'matchData': [{'score': 2, 'assists': 1}]
    })
    assert response.status_code == 200
    assert response.json()['playerId'] == 'player123'


def test_analyze_player_metrics_invalid():
    response = client.post('/metrics/player', json={
        'playerId': 'player123'
        # Missing matchData
    })
    assert response.status_code == 422