import pytest
from fastapi.testclient import TestClient
from src.api.video_upload_error_handler import app

client = TestClient(app)

# Test case for handling invalid file type

def test_video_upload_error_invalid_type():
    response = client.post("/upload", json={
        "file_name": "test_video.txt",
        "file_size": 500000,
        "metadata": {"description": "Invalid file type"}
    })
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid file type"}

# Test case for handling empty upload

def test_video_upload_error_empty():
    response = client.post("/upload", json={})
    assert response.status_code == 422
    assert response.json() == {"detail": "Empty upload request"}
