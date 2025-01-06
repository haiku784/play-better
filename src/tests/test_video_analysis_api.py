import pytest
from fastapi.testclient import TestClient
from app import app  # Adjust the import based on your project structure

client = TestClient(app)


@pytest.mark.parametrize("video_data, expected_status_code", [
    (b"valid_video_data", 200),  # Simulate valid video data
    (b"", 400),  # Empty video data
    (b"corrupted_video_data", 422),  # Simulate corrupted data
    (None, 400)  # No data provided
])
def test_video_analysis_api(video_data, expected_status_code):
    response = client.post("/video-analysis", data=video_data)
    assert response.status_code == expected_status_code


def test_video_analysis_response_format():
    response = client.post("/video-analysis", data=b"valid_video_data")
    assert "analysis_result" in response.json()  # Check if the response contains analysis_result
    assert response.status_code == 200


def test_invalid_endpoint():
    response = client.get("/invalid-endpoint")
    assert response.status_code == 404  # Check for a non-existent endpoint

