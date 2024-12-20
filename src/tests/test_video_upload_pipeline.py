import pytest
from fastapi.testclient import TestClient
from src.api.video_upload_pipeline import app, VideoMetadata

client = TestClient(app)

# Test valid video upload
def test_valid_video_upload():
    response = client.post("/upload-video/", files={"file": open("test_video.mp4", "rb")}, json={
        "title": "Test Video",
        "description": "This is a test video.",
        "user_id": "123e4567-e89b-12d3-a456-426614174000",
        "timestamp": "2023-10-01T10:00:00Z"
    })
    assert response.status_code == 200
    assert response.json()["message"] == "Upload successful"

# Test upload with invalid file type
def test_invalid_file_type():
    response = client.post("/upload-video/", files={"file": open("test_text.txt", "rb")}, json={
        "title": "Invalid Video",
        "description": "This should fail.",
        "user_id": "123e4567-e89b-12d3-a456-426614174000",
        "timestamp": "2023-10-01T10:00:00Z"
    })
    assert response.status_code == 200
    assert "Invalid file type" in response.json()["error"]

# Test upload with missing metadata
def test_missing_metadata():
    response = client.post("/upload-video/", files={"file": open("test_video.mp4", "rb")}, json={})
    assert response.status_code == 422

