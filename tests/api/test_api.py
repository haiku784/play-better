import pytest
from fastapi.testclient import TestClient
from main import app  # Assuming your FastAPI app is in `main.py`

client = TestClient(app)

# Test for successful response from the API endpoint

def test_read_items():
    response = client.get("/items/")  # Adjust the endpoint as necessary
    assert response.status_code == 200  # Check if the status code is OK
    assert "items" in response.json()  # Ensure 'items' key is in the response

# Test for API Not Found

def test_read_item_not_found():
    response = client.get("/items/9999")  # Test with a non-existent item ID
    assert response.status_code == 404  # Expect 404 not found
