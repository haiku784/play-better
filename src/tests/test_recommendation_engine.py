import pytest
from src.api.recommendation_engine import RecommendationEngine
from src.api.models import UserPreferences

@pytest.fixture
def user_preferences():
    return UserPreferences(user_id=1, preferences={'type': 'game', 'level': 'beginner'})

@pytest.fixture
def recommendation_engine():
    return RecommendationEngine()

def test_generate_recommendations(user_preferences, recommendation_engine):
    recommendations = recommendation_engine.generate_recommendations(user_preferences)
    assert isinstance(recommendations, list)
    assert len(recommendations) > 0
    assert all('recommended_item' in rec for rec in recommendations)


def test_no_preferences(recommendation_engine):
    empty_preferences = UserPreferences(user_id=999, preferences={})
    recommendations = recommendation_engine.generate_recommendations(empty_preferences)
    assert recommendations == []