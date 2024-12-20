import pytest
from fastapi.testclient import TestClient
from ..game_configuration_api import router

client = TestClient(router)

def test_get_game_configuration():
    response = client.get("/game-configuration/some_game_title")
    assert response.status_code == 200
    assert "configuration_details" in response.json()
