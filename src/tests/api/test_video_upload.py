from fastapi.testclient import TestClient
from src.api.video_upload import app

client = TestClient(app)

def test_upload_video():
    response = client.post("/upload_video/", files={'file': ('test_video.mp4', b'test content')})
    assert response.status_code == 200
    assert "Video uploaded successfully!" in response.json().values()
