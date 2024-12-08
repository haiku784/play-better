import pytest
from repository.user_repository import UserRepository
from entities.user import User

class MockDatabase:
    def __init__(self):
        self.data = {}

    def add(self, user):
        self.data[user.username] = user

    def get(self, username):
        return self.data.get(username)


def test_user_repository_add_and_get():
    db = MockDatabase()
    repo = UserRepository(db)
    user = User('testuser', 'test@example.com')
    repo.add_user(user)
    assert repo.get_user('testuser') == user
    assert repo.get_user('nonexistent') is None
