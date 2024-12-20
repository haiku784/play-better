import pytest
from fastapi.testclient import TestClient
from .metrics import app

client = TestClient(app)

def test_submit_performance_metrics():
    response = client.post('/api/performance-metrics', json={'metric_name': 'CPU Usage', 'value': 75.5, 'timestamp': '2023-10-01T12:00:00Z'})
    assert response.status_code == 200
    assert response.json() == {'message': 'Metrics submitted successfully!'}


def test_get_performance_metrics():
    client.post('/api/performance-metrics', json={'metric_name': 'Memory Usage', 'value': 65.2, 'timestamp': '2023-10-01T12:01:00Z'})
    response = client.get('/api/performance-metrics')
    assert response.status_code == 200
    assert len(response.json()) > 0