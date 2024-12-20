import pytest
from fastapi.testclient import TestClient
from src.api.practice_routine import app

client = TestClient(app)

def test_generate_routine_success():
    response = client.post("/generate_routine", json={"speed": 65, "accuracy": 70})
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]['routine_name'] == "Speed Improvement"  # Example check

def test_generate_routine_no_metrics():
    response = client.post("/generate_routine", json={})
    assert response.status_code == 200
    assert len(response.json()) == 0
