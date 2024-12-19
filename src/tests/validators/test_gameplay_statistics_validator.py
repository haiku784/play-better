import pytest
from ..validators.gameplay_statistics_validator import GameplayStatistics


def test_valid_gameplay_statistics():
    stats = GameplayStatistics(player_id='Player1', game_id='Game1', score=50, gameplay_time=120, levels_completed=5)
    assert stats.player_id == 'Player1'
    assert stats.score == 50


def test_invalid_player_id():
    with pytest.raises(ValueError, match='Player ID must be at least 3 characters long'):
        GameplayStatistics(player_id='P1', game_id='Game1', score=50, gameplay_time=120, levels_completed=5)


def test_negative_score():
    with pytest.raises(ValueError, match='ensure this value is greater than or equal to 0'):
        GameplayStatistics(player_id='Player1', game_id='Game1', score=-1, gameplay_time=120, levels_completed=5)
