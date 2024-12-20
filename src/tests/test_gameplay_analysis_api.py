import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

@pytest.mark.parametrize('analysis_data', [
    {'score': 100, 'win_rate': 0.75},
    {'score': 200, 'win_rate': 0.85},
])
def test_create_analysis(analysis_data):
    response = client.post('/analysis/', json=analysis_data)
    assert response.status_code == 200
    assert response.json()['score'] == analysis_data['score']

def test_read_analysis():
    response = client.get('/analysis/1')
    assert response.status_code == 200
    assert 'score' in response.json()

def test_read_nonexistent_analysis():
    response = client.get('/analysis/999')
    assert response.status_code == 404