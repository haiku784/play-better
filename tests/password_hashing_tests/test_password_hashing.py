import pytest
from utilities.password_hashing import hash_password, check_password



def test_password_hashing():
    password = 'securePassword123'
    hashed = hash_password(password)
    assert check_password(password, hashed) is True
    assert check_password('wrongPassword', hashed) is False
