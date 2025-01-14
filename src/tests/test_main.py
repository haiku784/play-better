import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_upload_session():
    response = client.post("/upload-session/", files={"file": ("test_video.mp4", open("./test_video.mp4", "rb"))})
    assert response.status_code == 200
    assert response.json() == {"message": "Upload successful!"}