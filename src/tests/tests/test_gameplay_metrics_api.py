import pytest
from fastapi.testclient import TestClient
from src.api.gameplay_metrics_api import router
from src.main import app

client = TestClient(app)

def test_get_metrics_success():
    response = client.get('/get-metrics/user123')
    assert response.status_code == 200

def test_get_metrics_not_found():
    response = client.get('/get-metrics/nonexistent_user')
    assert response.status_code == 404
