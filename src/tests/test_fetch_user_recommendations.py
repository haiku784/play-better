import pytest
from src.api.models import UserRecommendations
from src.api.recommendation_engine import RecommendationEngine

@pytest.fixture
def recommendation_engine():
    return RecommendationEngine()

@pytest.fixture
def user_id():
    return 1

def test_fetch_user_recommendations(user_id, recommendation_engine):
    recommendations = recommendation_engine.fetch_user_recommendations(user_id)
    assert isinstance(recommendations, list)
    assert all(isinstance(rec, UserRecommendations) for rec in recommendations)


def test_fetch_nonexistent_user_recommendations(recommendation_engine):
    recommendations = recommendation_engine.fetch_user_recommendations(999)
    assert recommendations == []