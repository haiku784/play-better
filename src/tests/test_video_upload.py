import pytest
from fastapi.testclient import TestClient
from ..app import app

client = TestClient(app)

def test_upload_video():
    response = client.post("/upload-video", files={"file": open("test_video.mp4", "rb")})
    assert response.status_code == 200
    assert response.json()['message'] == "Video uploaded successfully!"
    assert 'filename' in response.json()


def test_upload_invalid_file_type():
    response = client.post("/upload-video", files={"file": open("test_text.txt", "rb")})
    assert response.status_code == 400
    assert response.json()['detail'] == "File must be a video."


def test_upload_large_file():
    # Simulate a large file upload
    response = client.post("/upload-video", files={"file": ("large_video.mp4", b"x"* (2 * 1024 * 1024 * 1024))})
    assert response.status_code == 400
    assert response.json()['detail'] == "File is too large. Must be less than 1 hour.