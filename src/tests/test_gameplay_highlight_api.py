import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

database = {
    'user_1': [
        Highlight(user_id='user_1', session_id='session_1', highlight_id='highlight_1', timestamp='2023-10-01T00:00:00Z', highlight_type='kill', video_segment_link='http://example.com/video1.mp4')
    ]
}

@app.get('/highlights/user_1/session_1')
async def test_get_highlights_valid_user():
    response = client.get('/highlights/user_1/session_1')
    assert response.status_code == 200
    assert response.json() == {'highlights': [{'user_id': 'user_1', 'session_id': 'session_1', 'highlight_id': 'highlight_1', 'timestamp': '2023-10-01T00:00:00Z', 'highlight_type': 'kill', 'video_segment_link': 'http://example.com/video1.mp4'}]}

async def test_get_highlights_invalid_user():
    response = client.get('/highlights/user_2/session_1')
    assert response.status_code == 403

async def test_get_highlights_no_highlights_found():
    response = client.get('/highlights/user_1/session_2')
    assert response.status_code == 404
    assert response.json() == {'detail': 'No highlights found'}