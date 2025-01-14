import pytest
from fastapi.testclient import TestClient
from src.api.gameplay_metrics_api import app

client = TestClient(app)

@pytest.fixture
def setup_database():
    # Setup code to initialize test database
    pass

@pytest.mark.parametrize('metrics, expected_status', [
    ({"user_id": "user1", "session_id": "session1", "kills": 10, "deaths": 5, "objectives_completed": 2}, 200),
    ({"user_id": "user1", "session_id": "session1", "kills": 10, "deaths": 0, "objectives_completed": 2}, 200),
])
def test_save_metrics(metrics, expected_status):
    response = client.post('/gameplay_metrics/save', json=metrics)
    assert response.status_code == expected_status

@pytest.mark.parametrize('user_id, expected_status', [
    ("user1", 404),
])
def test_get_metrics_not_found(user_id, expected_status):
    response = client.get(f'/gameplay_metrics/{user_id}')
    assert response.status_code == expected_status
