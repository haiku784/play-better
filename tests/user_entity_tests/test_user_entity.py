import pytest

class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def get_user_info(self):
        return self.username, self.email


def test_user_creation():
    user = User('testuser', 'test@example.com')
    assert user.username == 'testuser'
    assert user.email == 'test@example.com'

def test_get_user_info():
    user = User('testuser', 'test@example.com')
    assert user.get_user_info() == ('testuser', 'test@example.com')
