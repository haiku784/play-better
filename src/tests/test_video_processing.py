import pytest
from fastapi.testclient import TestClient
from api.video_processing_api import app

client = TestClient(app)

def test_upload_video_invalid_file_type():
    response = client.post("/upload-video/", files={"file": ("test.txt", b"dummy data")})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid file type. Only mp4, avi, or mov allowed."}

# Further tests should include valid video upload and processing checks.
