import pytest
from src.controllers.video_upload_controller import VideoUploadController
from unittest.mock import MagicMock

@pytest.fixture
def setup_video_upload_controller():
    controller = VideoUploadController()  # Initialize the video upload controller
    controller.video_service = MagicMock()  # Mocking any dependencies
    return controller


def test_upload_video(setup_video_upload_controller):
    # Arrange
    video_data = {'title': 'Test Video', 'file': 'test_video.mp4'}
    setup_video_upload_controller.video_service.upload.return_value = True

    # Act
    result = setup_video_upload_controller.upload_video(video_data)

    # Assert
    assert result is True
    setup_video_upload_controller.video_service.upload.assert_called_once_with(video_data)


def test_get_video(setup_video_upload_controller):
    # Arrange
    video_id = 456
    expected_video = {'id': video_id, 'title': 'Test Video', 'url': 'http://example.com/video.mp4'}
    setup_video_upload_controller.video_service.get_video.return_value = expected_video

    # Act
    result = setup_video_upload_controller.get_video(video_id)

    # Assert
    assert result == expected_video
    setup_video_upload_controller.video_service.get_video.assert_called_once_with(video_id)