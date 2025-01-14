import pytest
from fastapi.testclient import TestClient
from api.recording_api import app

client = TestClient(app)

def test_get_sessions_success():
    response = client.get('/api/recording/sessions?user_id=test_user')
    assert response.status_code == 200

def test_get_sessions_not_found():
    response = client.get('/api/recording/sessions?user_id=nonexistent_user')
    assert response.status_code == 404
    assert response.json()['detail'] == "Sessions not found.