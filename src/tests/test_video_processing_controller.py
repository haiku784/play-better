import pytest
from fastapi.testclient import TestClient
from ..app import app

client = TestClient(app)

def test_process_video_success():
    """Test successful video processing"""
    response = client.post("/process_video/", json={"file": "test_video.mp4"})
    assert response.status_code == 200
    assert response.json() == {"message": "Processing successful!"}


def test_process_video_no_file():
    """Test processing without a file"""
    response = client.post("/process_video/", json={})
    assert response.status_code == 400
    assert response.json() == {"detail": "No file provided."}


def test_process_video_internal_error():
    """Test processing with an internal error"""
    # Here we could mock the VideoProcessingLogger to raise an error
    response = client.post("/process_video/", json={"file": ""})
    assert response.status_code == 500
    assert "Internal Server Error" in response.json()["detail"]