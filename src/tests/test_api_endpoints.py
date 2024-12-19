import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_get_gameplay_statistics():
    response = client.get('/gameplay_statistics')
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # Additional checks can be added based on expected data structure
