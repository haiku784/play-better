import pytest
from fastapi.testclient import TestClient
from .feedback_analysis_api import app

client = TestClient(app)

def test_save_feedback_analysis():
    response = client.post('/feedback-analysis', json={
        "user_id": "12345",
        "gear_id": "gear_abc",
        "aggregated_ratings": 4.8,
        "insights": "User prefers lightweight gear."
    })
    assert response.status_code == 200
    assert response.json() == {"message": "Feedback analysis saved successfully"}


def test_get_feedback_analysis():
    response = client.get('/feedback-analysis/12345')
    assert response.status_code == 200
    assert isinstance(response.json(), list)