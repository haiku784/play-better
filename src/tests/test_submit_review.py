import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_submit_review_success():
    response = client.post('/submit-review', json={
        'user_id': 'user123',
        'gear_option_id': 'gear456',
        'review_text': 'Great gear!',
        'rating': 4.5
    })
    assert response.status_code == 200
    assert response.json() == {'message': 'Review submitted successfully!'}

def test_submit_review_invalid_rating():
    response = client.post('/submit-review', json={
        'user_id': 'user123',
        'gear_option_id': 'gear456',
        'review_text': 'Great gear!',
        'rating': 6
    })
    assert response.status_code == 400
    assert response.json() == {'detail': 'Rating must be between 0 and 5'}

def test_submit_review_missing_fields():
    response = client.post('/submit-review', json={
        'user_id': 'user123',
        'gear_option_id': 'gear456'
    })
    assert response.status_code == 422  # Unprocessable Entity for missing fields