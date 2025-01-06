import pytest
from fastapi.testclient import TestClient
from src.api.app import app

# Initialize the FastAPI test client
client = TestClient(app)

# Test for the GET endpoint of gameplay sessions

def test_get_gameplay_sessions():
    response = client.get("/gameplay_sessions/")
    assert response.status_code == 200  # Check if the response is OK
    assert isinstance(response.json(), list)  # Ensure the response is a list

# Test for the POST endpoint to create a new gameplay session

def test_create_gameplay_session():
    payload = {"name": "Session 1", "duration": 120}
    response = client.post("/gameplay_sessions/", json=payload)
    assert response.status_code == 201  # Check if the session was created
    assert response.json()["name"] == "Session 1"  # Validate session name

# Test for the GET endpoint for a specific session

def test_get_specific_gameplay_session():
    response = client.get("/gameplay_sessions/1/")
    assert response.status_code == 200  # Check if the response is OK
    assert response.json()["id"] == 1  # Validate session ID

# Test for the PUT endpoint to update a gameplay session

def test_update_gameplay_session():
    payload = {"name": "Updated Session", "duration": 150}
    response = client.put("/gameplay_sessions/1/", json=payload)
    assert response.status_code == 200  # Check if the update was successful
    assert response.json()["name"] == "Updated Session"  # Validate updated name

# Test for the DELETE endpoint to remove a gameplay session

def test_delete_gameplay_session():
    response = client.delete("/gameplay_sessions/1/")
    assert response.status_code == 204  # Check if the session was deleted successfully