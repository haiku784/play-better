# Test suite for the Rapid Recovery Documentation module

from fastapi.testclient import TestClient
from api.recovery_documentation import router

client = TestClient(router)

def test_create_recovery_strategy():
    response = client.post("/recovery-strategy/", json={
        "strategy_name": "Backup Server",
        "description": "Use a backup server in case of primary server failure.",
        "steps": ["Identify failure", "Switch to backup server", "Notify users"]
    })
    assert response.status_code == 200
    assert response.json()["strategy_name"] == "Backup Server"


def test_get_recovery_strategies():
    response = client.get("/recovery-strategy/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_recovery_strategy():
    response = client.get("/recovery-strategy/Backup Server")
    assert response.status_code == 200
    assert response.json()["strategy_name"] == "Backup Server"


def test_delete_recovery_strategy():
    response = client.delete("/recovery-strategy/Backup Server")
    assert response.status_code == 200
    assert response.json()["message"] == "Strategy deleted successfully.