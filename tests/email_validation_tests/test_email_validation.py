import pytest
from utilities.email_validator import is_valid_email


def test_valid_email():
    assert is_valid_email('test@example.com') is True
    assert is_valid_email('user.name+tag+sorting@example.com') is True

def test_invalid_email():
    assert is_valid_email('plainaddress') is False
    assert is_valid_email('missingatsign.com') is False
    assert is_valid_email('@missingusername.com') is False
