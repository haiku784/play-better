import pytest
from fastapi.testclient import TestClient
from sharing_service import app, SharingPermissionCreate

client = TestClient(app)

@pytest.fixture
def create_permission():
    response = client.post("/permissions/", json={
        "user_id": 1,
        "shared_with_user_id": 2,
        "record_id": 3,
        "permission_type": "view"
    })
    return response.json()

def test_create_sharing_permission(create_permission):
    assert create_permission['user_id'] == 1
    assert create_permission['shared_with_user_id'] == 2
    assert create_permission['record_id'] == 3
    assert create_permission['permission_type'] == "view"

def test_read_sharing_permission(create_permission):
    permission_id = create_permission['permission_id']
    response = client.get(f"/permissions/{permission_id}/")
    assert response.status_code == 200
    assert response.json() == create_permission

def test_delete_sharing_permission(create_permission):
    permission_id = create_permission['permission_id']
    response = client.delete(f"/permissions/{permission_id}/")
    assert response.status_code == 200
    assert response.json() == {"detail": "Sharing permission deleted"}
    response = client.get(f"/permissions/{permission_id}/")
    assert response.status_code == 404