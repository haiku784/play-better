import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .database import get_db, UserPreferences
from .models import Base

DATABASE_URL = "sqlite:///:memory:"  # Using in-memory SQLite database for testing

@pytest.fixture
def test_db():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = TestingSessionLocal()
    yield db
    db.close()

def test_create_user_preference(test_db):
    # Test creating a user preference
    user_pref = create_user_preference(test_db, user_id=1, key='theme', value='dark')
    assert user_pref.key == 'theme'
    assert user_pref.value == 'dark'
    assert user_pref.user_id == 1

# Unit tests for the UserPreferences database functions.