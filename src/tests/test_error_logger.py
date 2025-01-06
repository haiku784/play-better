import pytest
from src.api.error_logger import ErrorLogger
from unittest.mock import MagicMock

@pytest.fixture
def setup_error_logger():
    logger = ErrorLogger()  # Initialize the error logger
    logger.logging_service = MagicMock()  # Mocking any dependencies
    return logger


def test_log_error(setup_error_logger):
    # Arrange
    error_message = 'Test error'
    setup_error_logger.logging_service.log.return_value = True

    # Act
    result = setup_error_logger.log_error(error_message)

    # Assert
    assert result is True
    setup_error_logger.logging_service.log.assert_called_once_with(error_message)