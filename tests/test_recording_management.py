import pytest
from fastapi.testclient import TestClient
from api.recording_management import router

client = TestClient(router)

def test_share_content_success():
    response = client.post("/share", json={
        'user_id': '12345',
        'gear_id': '67890',
        'platform': 'Facebook',
        'message': 'Check this out!'
    })
    assert response.status_code == 200
    assert response.json()['status'] == "success"

def test_share_content_missing_fields():
    response = client.post("/share", json={
        'user_id': '12345'
    })
    assert response.status_code == 400
    assert response.json()['detail'] == "Missing required fields