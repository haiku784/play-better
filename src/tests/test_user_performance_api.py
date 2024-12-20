from fastapi.testclient import TestClient
from .user_performance_api import router

client = TestClient(router)

def test_get_user_performance():
    response = client.get("/user_performance/1")
    assert response.status_code == 200
    assert response.json()["user_id"] == 1