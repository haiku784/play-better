import pytest
from fastapi.testclient import TestClient
from api.gameplay_analysis_api import app

client = TestClient(app)

def test_get_comparative_metrics_valid():
    response = client.post("/compare-metrics", json={
        "user_id": "user123",
        "configuration_ids": ["config1", "config2"]
    })
    assert response.status_code == 200
    assert "configurations" in response.json()


def test_get_comparative_metrics_invalid():
    response = client.post("/compare-metrics", json={
        "user_id": "user123",
        "configuration_ids": ["invalid_config"]
    })
    assert response.status_code == 404
    assert response.json()["detail"] == "Configuration ID invalid_config not found