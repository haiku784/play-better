import pytest
from entities.user import User


def test_profile_update():
    user = User('testuser', 'test@example.com')
    user.username = 'newusername'
    user.email = 'new@example.com'
    assert user.username == 'newusername'
    assert user.email == 'new@example.com'
