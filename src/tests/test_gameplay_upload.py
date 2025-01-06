import pytest
from fastapi.testclient import TestClient
from .app import app

client = TestClient(app)

def test_upload_footage():
    """
    Test the video upload endpoint.
    """
    with open("test_video.mp4", "rb") as video_file:
        response = client.post("/upload/footage", files={"file": video_file})
    assert response.status_code == 200
    assert response.json()["message"] == "File uploaded successfully!"

def test_get_performance_metrics():
    """
    Test the performance metrics retrieval endpoint.
    """
    session_id = "12345"
    response = client.get(f"/metrics/{session_id}")
    assert response.status_code == 200
    assert response.json()["session_id"] == session_id