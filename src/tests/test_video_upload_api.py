import pytest
from fastapi.testclient import TestClient
from src.api.video_upload import app

client = TestClient(app)

# Test case for successful video upload


def test_video_upload_success():
    response = client.post("/upload", json={
        "file_name": "test_video.mp4",
        "file_size": 500000,
        "metadata": {"description": "Test video for upload"}
    })
    assert response.status_code == 200
    assert response.json() == {"message": "Video uploaded successfully"}

# Test case for invalid file size

def test_video_upload_invalid_size():
    response = client.post("/upload", json={
        "file_name": "test_video.mp4",
        "file_size": 15000000,
        "metadata": {"description": "Too large video"}
    })
    assert response.status_code == 400
    assert response.json() == {"detail": "File size exceeds limit"}

# Test case for missing metadata

def test_video_upload_missing_metadata():
    response = client.post("/upload", json={
        "file_name": "test_video.mp4",
        "file_size": 500000,
    })
    assert response.status_code == 422
    assert response.json() == {"detail": "Missing required metadata"}
