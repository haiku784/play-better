from fastapi.testclient import TestClient
from services.gameplay_recording.playback_service import app

def test_start_playback_valid_session():
    client = TestClient(app)
    response = client.post("/playback/start", json={"sessionId": "valid_session", "userId": "user_123"})
    assert response.status_code == 200
    assert response.json() == {'status': 'success', 'message': 'Playback started successfully.'}

def test_start_playback_invalid_session():
    client = TestClient(app)
    response = client.post("/playback/start", json={"sessionId": "invalid_session", "userId": "user_123"})
    assert response.status_code == 200
    assert response.json()['status'] == 'fail'
