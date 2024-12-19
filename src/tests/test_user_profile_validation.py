import pytest
from fastapi.testclient import TestClient
from ..user_profile_api import app

client = TestClient(app)

def test_create_user_profile_valid():
    response = client.post('/create_user_profile/', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'StrongPass1!'
    })
    assert response.status_code == 200
    assert response.json()['message'] == 'User profile created successfully'


def test_create_user_profile_invalid_email():
    response = client.post('/create_user_profile/', json={
        'username': 'testuser',
        'email': 'invalid-email',
        'password': 'StrongPass1!'
    })
    assert response.status_code == 400


def test_create_user_profile_short_password():
    response = client.post('/create_user_profile/', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'short'
    })
    assert response.status_code == 400