# test_performance_metrics.py

import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_performance_analysis():
    data = {"sample_data": "value"}  # Sample payload for testing
    response = client.post("/api/analysis", json=data)
    assert response.status_code == 200
    assert 'response_time_ms' in response.json()[1]  # Check if response time is present


def test_performance_recommendations():
    user_id = 1  # Sample user ID for testing
    response = client.get(f"/api/recommendations/{user_id}")
    assert response.status_code == 200
    assert 'response_time_ms' in response.json()[1]  # Check if response time is present
