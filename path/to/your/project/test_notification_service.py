import pytest
from fastapi.testclient import TestClient
from notification_service import app, NotificationCreate

client = TestClient(app)

@pytest.fixture
def create_notification():
    response = client.post("/notifications/", json={"user_id": 1, "message": "Test notification"})
    return response.json()

def test_create_notification(create_notification):
    assert create_notification['message'] == "Test notification"
    assert create_notification['user_id'] == 1

def test_get_notifications(create_notification):
    response = client.get("/notifications/1/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_mark_notification_read(create_notification):
    notification_id = create_notification['id']
    response = client.put(f"/notifications/{notification_id}/read/")
    assert response.status_code == 200
    assert response.json()['message'] == "Notification marked as read