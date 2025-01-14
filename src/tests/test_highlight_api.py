import pytest
from fastapi.testclient import TestClient
from src.api.main import app

client = TestClient(app)

def test_save_highlight():
    response = client.post('/highlights/save', json={
        'user_id': '12345',
        'session_id': 'abcde',
        'timestamp': '2023-10-01T00:00:00Z',
        'highlight_type': 'kill',
        'video_segment_link': 'http://example.com/video_segment'
    })
    assert response.status_code == 200
    assert response.json() == {'status': 'Highlight saved successfully'}

def test_get_highlights():
    response = client.get('/highlights/12345/abcde')
    assert response.status_code == 200
    assert 'highlights' in response.json()