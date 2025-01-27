import pytest
from fastapi.testclient import TestClient
from services.user_feedback_collection.feedback_retrieval import app

client = TestClient(app)

def test_retrieve_feedback_success():
    response = client.get('/feedback/retrieve', params={
        'productId': 'prod456'
    })
    assert response.status_code == 200
    assert isinstance(response.json()['feedbacks'], list)

def test_retrieve_feedback_not_found():
    response = client.get('/feedback/retrieve', params={
        'productId': 'nonexistent'
    })
    assert response.status_code == 404
    assert response.json()['detail'] == 'No feedback found for this product'
