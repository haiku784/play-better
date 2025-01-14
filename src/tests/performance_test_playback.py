import time
import requests

def test_video_playback_performance(video_url):
    start_time = time.time()
    response = requests.get(video_url)
    end_time = time.time()

    assert response.status_code == 200, 'Video playback failed'
    assert end_time - start_time < 2, 'Video did not load within 2 seconds'

# Example usage
video_url = 'http://example.com/video.mp4'
test_video_playback_performance(video_url)