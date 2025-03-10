import pytest
from fastapi.testclient import TestClient
from user_management_service import app

client = TestClient(app)

# Test creating a user
def test_create_user():
    response = client.post("/users/", json={
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "patient",
        "preferences": "none"
    })
    assert response.status_code == 200
    assert response.json()["name"] == "John Doe"

# Test reading a user
def test_read_user():
    response = client.get("/users/1")
    assert response.status_code == 200
    assert "name" in response.json()

# Test updating a user
def test_update_user():
    response = client.put("/users/1", json={
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "role": "doctor",
        "preferences": "none"
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Jane Doe"

# Test deleting a user
def test_delete_user():
    response = client.delete("/users/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "User deleted successfully