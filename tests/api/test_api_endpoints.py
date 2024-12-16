import pytest
from fastapi.testclient import TestClient
from myapp.main import app  # Adjust the import based on your project structure

client = TestClient(app)

# Test the health check endpoint

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

# Test creating a new resource

def test_create_resource():
    response = client.post("/resources/", json={"name": "Test Resource"})
    assert response.status_code == 201
    assert response.json()["name"] == "Test Resource"

# Test getting the list of resources

def test_get_resources():
    response = client.get("/resources/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Test getting a specific resource

def test_get_resource():
    response = client.get("/resources/1")  # assuming an ID of 1 exists
    assert response.status_code == 200
    assert response.json()["id"] == 1

# Test updating a resource

def test_update_resource():
    response = client.put("/resources/1", json={"name": "Updated Resource"})
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Resource"

# Test deleting a resource

def test_delete_resource():
    response = client.delete("/resources/1")
    assert response.status_code == 204
