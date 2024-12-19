import pytest
from src.models.game import Game

def test_game_creation():
    game = Game(id=1, title="Test Game", genre="Action", release_year=2023)
    assert game.title == "Test Game"
    assert game.genre == "Action"
    assert game.release_year == 2023
