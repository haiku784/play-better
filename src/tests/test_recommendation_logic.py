import pytest
from .recommendation_logic import generate_recommendation

# Test cases for the recommendation logic

def test_recommendation_logic():
    assert generate_recommendation(80) == "Recommendation A"
    assert generate_recommendation(60) == "Recommendation B"
    assert generate_recommendation(40) == "Recommendation C"
