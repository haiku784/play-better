import pytest
from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)

@pytest.fixture
def user_data():
    return {
        'username': 'testuser',
        'email': 'test@example.com',
        'full_name': 'Test User',
        'bio': 'This is a test user.'
    }

def test_create_user_profile(user_data):
    response = client.post('/users/', json=user_data)
    assert response.status_code == 200
    assert response.json()['username'] == user_data['username']

def test_get_user_profile(user_data):
    response = client.post('/users/', json=user_data)
    user_id = response.json()['id']

    response = client.get(f'/users/{user_id}')
    assert response.status_code == 200
    assert response.json()['username'] == user_data['username']