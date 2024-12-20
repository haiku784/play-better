import pytest
from fastapi.testclient import TestClient
from src.api.video_upload import app
import time

client = TestClient(app)

# Performance test for video upload under load

def test_video_upload_performance():
    start_time = time.time()
    for i in range(100):  # Simulate 100 concurrent uploads
        response = client.post("/upload", json={
            "file_name": f"test_video_{i}.mp4",
            "file_size": 500000,
            "metadata": {"description": "Test video for upload"}
        })
        assert response.status_code == 200
    duration = time.time() - start_time
    assert duration < 10  # Ensure total time is under 10 seconds
