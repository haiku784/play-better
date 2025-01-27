import pytest
from fastapi.testclient import TestClient
from services.visual_data_representation.main import app

test_client = TestClient(app)

def test_get_match_data():
    response = test_client.post('/api/visualization/data', json={'matchId': '12345'})
    assert response.status_code == 200
    assert 'matchData' in response.json()
    assert response.json()['matchData']['matchId'] == '12345'

def test_get_match_data_missing_id():
    response = test_client.post('/api/visualization/data', json={})
    assert response.status_code == 400