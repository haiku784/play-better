import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_register_user():
    response = client.post("/register", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert response.json() == {"username": "testuser", "password": "testpass"}

    # Try to register the same user again
    response = client.post("/register", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Username already taken"}


def test_login_user():
    response = client.post("/login", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert response.json() == {"message": "Login successful"}

    # Test login with wrong password
    response = client.post("/login", json={"username": "testuser", "password": "wrongpass"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid username or password"}
