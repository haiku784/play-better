import pytest
from src.models.user_preferences import UserPreferences

# Test suite for UserPreferences model
class TestUserPreferencesModel:

    def test_user_preferences_creation(self):
        user_pref = UserPreferences(user_id=1, preferences={"theme": "dark"})
        assert user_pref.user_id == 1
        assert user_pref.preferences == {"theme": "dark"}

    def test_user_preferences_update(self):
        user_pref = UserPreferences(user_id=1, preferences={"theme": "dark"})
        user_pref.preferences = {"theme": "light"}
        assert user_pref.preferences == {"theme": "light"}