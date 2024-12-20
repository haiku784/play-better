import pytest
from fastapi.testclient import TestClient
from .video_upload import app

client = TestClient(app)

def test_upload_video():
    response = client.post("/upload-video/", files={"file": ("test_video.mp4", open("test_video.mp4", "rb"))})
    assert response.status_code == 200
    assert response.json() == {"message": "Video uploaded successfully!"}
