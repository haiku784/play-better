import pytest
from src.api.session_cache_manager import SessionCacheManager
from unittest.mock import MagicMock

@pytest.fixture
def setup_cache_manager():
    manager = SessionCacheManager()  # Initialize the session cache manager
    manager.cache_service = MagicMock()  # Mocking any dependencies
    return manager


def test_cache_session(setup_cache_manager):
    # Arrange
    session_id = 'session123'
    data = {'user_id': 1, 'game_id': 2}
    setup_cache_manager.cache_service.cache.return_value = True

    # Act
    result = setup_cache_manager.cache_session(session_id, data)

    # Assert
    assert result is True
    setup_cache_manager.cache_service.cache.assert_called_once_with(session_id, data)


def test_retrieve_session(setup_cache_manager):
    # Arrange
    session_id = 'session123'
    expected_data = {'user_id': 1, 'game_id': 2}
    setup_cache_manager.cache_service.retrieve.return_value = expected_data

    # Act
    result = setup_cache_manager.retrieve_session(session_id)

    # Assert
    assert result == expected_data
    setup_cache_manager.cache_service.retrieve.assert_called_once_with(session_id)