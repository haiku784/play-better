import pytest
from fastapi.testclient import TestClient
from src.api.gear_metrics_api import app

client = TestClient(app)

def test_get_comparative_metrics_success():
    response = client.get('/comparative-metrics/?user_id=test_user')
    assert response.status_code == 200  # check for successful retrieval

def test_get_comparative_metrics_not_found():
    response = client.get('/comparative-metrics/?user_id=non_existing_user')
    assert response.status_code == 404  # check for not found
    assert response.json() == {'detail': 'No metrics found for this user'}
