import pytest
from src.models.player import Player

def test_player_creation():
    player = Player(id=1, name="John Doe", age=25, skill_level="Intermediate")
    assert player.name == "John Doe"
    assert player.age == 25
    assert player.skill_level == "Intermediate"
