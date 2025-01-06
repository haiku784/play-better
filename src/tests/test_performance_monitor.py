import pytest
from fastapi.testclient import TestClient
from src.api.app import app

client = TestClient(app)

def test_get_metrics():
    response = client.get("/monitoring/metrics")
    assert response.status_code == 200
    assert "uptime" in response.json()
    assert "request_count" in response.json()
    assert isinstance(response.json()["downtime_alerts"], list)
