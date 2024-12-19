import pytest
from src.models.score import Score

def test_score_creation():
    score = Score(player_id=1, game_id=1, score_value=100, date="2023-10-01")
    assert score.player_id == 1
    assert score.game_id == 1
    assert score.score_value == 100
    assert score.date == "2023-10-01"
