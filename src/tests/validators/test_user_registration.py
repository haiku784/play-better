import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_user_registration_valid():
    response = client.post("/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "securepassword123"
    })
    assert response.status_code == 200


def test_user_registration_invalid_username():
    response = client.post("/register", json={
        "username": "test@user!",
        "email": "test@example.com",
        "password": "securepassword123"
    })
    assert response.status_code == 400
    assert response.json()["detail"] == "Username must be alphanumeric."
