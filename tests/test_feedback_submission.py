import pytest
from fastapi.testclient import TestClient
from services.user_feedback_collection.feedback_submission import app

client = TestClient(app)

def test_submit_feedback_success():
    response = client.post('/feedback/submit', json={
        'userId': 'user123',
        'productId': 'prod456',
        'rating': 5,
        'comments': 'Great product!'
    })
    assert response.status_code == 200
    assert response.json()['status'] == 'success'
    assert 'feedbackId' in response.json()

def test_submit_feedback_invalid_rating():
    response = client.post('/feedback/submit', json={
        'userId': 'user123',
        'productId': 'prod456',
        'rating': 6,
        'comments': 'Great product!'
    })
    assert response.status_code == 400
    assert response.json()['detail'] == 'Rating must be between 1 and 5'
