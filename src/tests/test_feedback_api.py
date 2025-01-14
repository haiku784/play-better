import pytest
from fastapi.testclient import TestClient
from .feedback_api import app

client = TestClient(app)

def test_submit_feedback_valid():
    response = client.post('/feedback', json={
        "user_id": "12345",
        "gear_id": "gear_abc",
        "rating": 5,
        "comments": "Great experience!"
    })
    assert response.status_code == 200
    assert "recommendations" in response.json()


def test_submit_feedback_invalid_rating():
    response = client.post('/feedback', json={
        "user_id": "12345",
        "gear_id": "gear_abc",
        "rating": 6,
        "comments": "Invalid rating"
    })
    assert response.status_code == 400
    assert response.json() == {"detail":"Rating must be between 1 and 5"}