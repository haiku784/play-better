import pytest
from fastapi.testclient import TestClient
from app.modules.feedback_module import app

client = TestClient(app)

def test_submit_feedback_success():
    response = client.post("/feedback/submit", json={
        "userId": "user123",
        "productId": "product123",
        "rating": 5,
        "comments": "Great product!"
    })
    assert response.status_code == 200
    assert response.json()['status'] == "success"


def test_submit_feedback_invalid_rating():
    response = client.post("/feedback/submit", json={
        "userId": "user123",
        "productId": "product123",
        "rating": 6
    })
    assert response.status_code == 400


def test_retrieve_feedback():
    client.post("/feedback/submit", json={
        "userId": "user123",
        "productId": "product123",
        "rating": 5,
        "comments": "Great product!"
    })
    response = client.get("/feedback/retrieve/product123")
    assert response.status_code == 200
    assert len(response.json()['feedbacks']) > 0