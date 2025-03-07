import pytest
from fastapi.testclient import TestClient
from recording_service import app, SessionLocal, GameplaySession

# Test client
client = TestClient(app)

@pytest.fixture(scope="module")
def db_session():
    db = SessionLocal()
    yield db
    db.close()

def test_start_recording(db_session):
    response = client.post("/recording/start", json={
        "game_title": "Test Game",
        "duration": 120,
        "recorded_data": "Some recorded data",
        "tags": "tag1, tag2"
    })
    assert response.status_code == 200
    assert "session_id" in response.json()

def test_get_recording(db_session):
    response = client.get("/recording/1")  # Assuming session_id 1 exists
    assert response.status_code == 200
    assert response.json()["game_title"] == "Test Game"

def test_delete_recording(db_session):
    response = client.delete("/recording/1")  # Assuming session_id 1 exists
    assert response.status_code == 200
    assert response.json()["detail"] == "Session deleted successfully