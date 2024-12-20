import pytest
from src.api.services.user_recommendation_service import UserRecommendationService
from src.api.models import UserRecommendations

@pytest.fixture
def user_recommendation_service():
    return UserRecommendationService()

def test_user_recommendation_generation(user_recommendation_service):
    user_id = 1
    recommendations = user_recommendation_service.generate_recommendations(user_id)
    assert isinstance(recommendations, list)
    assert len(recommendations) > 0
    assert isinstance(recommendations[0], UserRecommendations)


def test_user_recommendation_not_found(user_recommendation_service):
    user_id = 999
    recommendations = user_recommendation_service.generate_recommendations(user_id)
    assert recommendations == []