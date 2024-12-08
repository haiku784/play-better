import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_user_performance_not_found():
    response = client.get('/performance/999')  # Assuming this user ID does not exist
    assert response.status_code == 404
    assert response.json() == {'detail': 'User not found'}

def test_get_user_performance_no_data():
    response = client.get('/performance/1')  # User ID 1 without performance data
    assert response.status_code == 200
    assert response.json() == {'message': 'No performance data available for this user'}

def test_get_user_performance_success():
    response = client.get('/performance/2')  # Assuming User ID 2 exists and has data
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Performance should return a list
