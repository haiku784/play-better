import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

# Test suite for user preference API endpoints
class TestUserPreferenceAPI:
    
    def test_get_user_preferences(self):
        response = client.get("/api/user_preferences/1")  # Assuming user_id is 1
        assert response.status_code == 200
        assert "preferences" in response.json()

    def test_update_user_preferences(self):
        response = client.put("/api/user_preferences/1", json={"preferences": {"theme": "dark"}})
        assert response.status_code == 200
        assert response.json()["message"] == "Preferences updated successfully"

    def test_delete_user_preferences(self):
        response = client.delete("/api/user_preferences/1")
        assert response.status_code == 200
        assert response.json()["message"] == "Preferences deleted successfully