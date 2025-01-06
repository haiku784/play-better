import pytest
from fastapi.testclient import TestClient
from src.api.app import app

client = TestClient(app)

def test_create_gameplay_session():
    response = client.post('/gameplay/sessions', json={'user_id': 1, 'game_id': 2})
    assert response.status_code == 201
    assert response.json() == {'message': 'Session created successfully.'}


def test_get_gameplay_session():
    response = client.get('/gameplay/sessions/1')
    assert response.status_code == 200
    assert 'id' in response.json()  # Ensure it returns an id


def test_upload_video_endpoint():
    response = client.post('/videos/upload', json={'title': 'Test Video', 'file': 'test_video.mp4'})
    assert response.status_code == 200
    assert response.json() == {'message': 'Video uploaded successfully.'}