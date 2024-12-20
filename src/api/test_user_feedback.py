import pytest
from fastapi.testclient import TestClient
from user_feedback import app

client = TestClient(app)

@pytest.fixture
def setup_feedback():
    """Setup mock data for user feedback tests."""
    return {
        "user_id": 1,
        "practice_routine_id": 101,
        "feedback": "Great practice routine!"
    }

def test_submit_feedback(setup_feedback):
    response = client.post("/feedback/submit", json=setup_feedback)
    assert response.status_code == 200
    assert response.json() == setup_feedback

def test_get_feedback(setup_feedback):
    client.post("/feedback/submit", json=setup_feedback)  # Submit feedback first
    response = client.get("/feedback/1")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0] == setup_feedback

def test_get_feedback_no_data():
    response = client.get("/feedback/99")
    assert response.status_code == 404
    assert response.json() == {"detail": "No feedback found for this user."}