import pytest
from fastapi.testclient import TestClient
from apirecording_api import app

client = TestClient(app)

def test_save_gameplay_metadata():
    response = client.post('/api/gameplay/save', json={
        'user_id': 'test_user',
        'timestamp': '2023-10-01T12:00:00Z',
        'duration': 3600,
        'recorded_file_link': 'http://example.com/recorded_file.mp4'
    })
    assert response.status_code == 200
    assert response.json()['user_id'] == 'test_user'


def test_get_gameplay_metadata():
    response = client.get('/api/gameplay/test_user')
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Should return a list
    assert len(response.json()) > 0  # Assuming there are records for this user


def test_get_gameplay_metadata_not_found():
    response = client.get('/api/gameplay/unknown_user')
    assert response.status_code == 404
    assert response.json()['detail'] == 'No records found'