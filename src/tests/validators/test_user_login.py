import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_user_login_valid():
    response = client.post("/login", json={
        "email": "test@example.com",
        "password": "securepassword123"
    })
    assert response.status_code == 200


def test_user_login_missing_email():
    response = client.post("/login", json={
        "password": "securepassword123"
    })
    assert response.status_code == 400
    assert "detail" in response.json() and response.json()["detail"] == "Email must be provided."
