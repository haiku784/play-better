from pydantic import ValidationError
from src.api.schemas.recommendation_schema import RecommendationSchema

def test_valid_recommendation_schema():
    data = {'recommended_item': 'Game A', 'user_id': 1}
    schema = RecommendationSchema(**data)
    assert schema.recommended_item == 'Game A'
    assert schema.user_id == 1


def test_invalid_recommendation_schema():
    data = {'recommended_item': 'Game A'}  # missing user_id
    with pytest.raises(ValidationError):
        RecommendationSchema(**data)