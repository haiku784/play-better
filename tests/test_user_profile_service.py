import pytest
from fastapi.testclient import TestClient
from app.user_profile_service import app

test_client = TestClient(app)

def test_get_user_profile():
    response = test_client.get('/user-profile?user_id=123')
    assert response.status_code == 200
    assert response.json()['user_id'] == '123'
    assert 'recommended_items' in response.json()