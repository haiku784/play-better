import pytest
from src.controllers.GameplaySessionController import GameplaySessionController
from unittest.mock import MagicMock

@pytest.fixture
def setup_controller():
    controller = GameplaySessionController()  # Initialize the controller
    controller.some_service = MagicMock()  # Mocking any dependencies
    return controller

def test_create_session(setup_controller):
    # Arrange
    session_data = {'user_id': 1, 'game_id': 2}
    setup_controller.some_service.create_session.return_value = True

    # Act
    result = setup_controller.create_session(session_data)

    # Assert
    assert result is True
    setup_controller.some_service.create_session.assert_called_once_with(session_data)


def test_get_session(setup_controller):
    # Arrange
    session_id = 123
    expected_session = {'id': session_id, 'user_id': 1, 'game_id': 2}
    setup_controller.some_service.get_session.return_value = expected_session

    # Act
    result = setup_controller.get_session(session_id)

    # Assert
    assert result == expected_session
    setup_controller.some_service.get_session.assert_called_once_with(session_id)