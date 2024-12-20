from fastapi.testclient import TestClient
from .main import app
from .schemas import UserPreferences

client = TestClient(app)

def test_update_user_preferences():
    # Mock user preference data
    response = client.put('/user/preferences', json={
        "preference_key": "theme",
        "preference_value": "light"
    })
    assert response.status_code == 200
    assert response.json() == {"preference_key": "theme", "preference_value": "light"}

    # Test with invalid data
    response = client.put('/user/preferences', json={
        "preference_key": "",
        "preference_value": ""
    })
    assert response.status_code == 422