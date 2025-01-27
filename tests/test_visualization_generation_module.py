import pytest
from fastapi.testclient import TestClient
from services.visual_data_representation.main import app

test_client = TestClient(app)

def test_generate_chart():
    response = test_client.post('/api/visualization/data', json={'data': [{'matchId': '12345'}], 'visualizationType': 'bar'})
    assert response.status_code == 200
    assert 'chartUrl' in response.json()


def test_generate_chart_missing_params():
    response = test_client.post('/api/visualization/data', json={})
    assert response.status_code == 400