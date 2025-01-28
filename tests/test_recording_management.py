import unittest
from fastapi.testclient import TestClient
from recording_management import app, Recording

class TestRecordingManagement(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_start_recording(self):
        response = self.client.post('/start_recording', json={
            'game_title': 'Super Game',
            'user_id': 'user123',
            'recording_quality': '1080p',
            'audio_enabled': True
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('recording_id', data)

    def test_stop_recording(self):
        # Start a recording first
        start_response = self.client.post('/start_recording', json={
            'game_title': 'Super Game',
            'user_id': 'user123'
        })
        recording_id = start_response.json()['recording_id']

        # Now stop that recording
        stop_response = self.client.post('/stop_recording', json={
            'recording_id': recording_id,
            'user_id': 'user123'
        })
        self.assertEqual(stop_response.status_code, 200)
        stop_data = stop_response.json()
        self.assertEqual(stop_data['status'], 'stopped')

    def test_get_recordings(self):
        # Assuming we have a recording already started
        self.client.post('/start_recording', json={
            'game_title': 'Super Game',
            'user_id': 'user123'
        })
        response = self.client.get('/get_recordings?user_id=user123')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)

if __name__ == '__main__':
    unittest.main()

import pytest
from fastapi.testclient import TestClient
from api.recording_management import router

client = TestClient(router)

def test_start_session():
    response = client.post('/playback/start', json={'session_id': '12345', 'user_id': 'user1'})
    assert response.status_code == 200
    assert response.json()['status'] == 'success'
    assert 'playback_url' in response.json()


def test_control_session():
    response = client.post('/playback/control', json={'session_id': '12345', 'action': 'play'})
    assert response.status_code == 200
    assert response.json()['status'] == 'success'
    assert 'current_time' in response.json()


def test_stop_session():
    response = client.post('/playback/stop', json={'session_id': '12345', 'user_id': 'user1'})
    assert response.status_code == 200
    assert response.json()['status'] == 'success'
    assert 'session_duration' in response.json()  


import pytest
from fastapi.testclient import TestClient
from api.recording_management import app

client = TestClient(app)

def test_request_export():
    response = client.post('/video/export', json={'videoId': '123', 'format': 'MP4', 'userId': 'abc'})
    assert response.status_code == 200
    assert response.json()['success'] is True
    assert response.json()['filePath'] == '/exports/123.mp4'


def test_check_export_status():
    response = client.post('/video/status', json={'exportId': 'abc'})
    assert response.status_code == 200
    assert response.json()['isComplete'] is True
    assert response.json()['progress'] == 100



import pytest
from fastapi.testclient import TestClient
from api.recording_management import app

client = TestClient(app)

def test_render_metrics_overlay():
    response = client.post('/api/performance-metrics/render', json={
        "gameplay_video_url": "https://example.com/video.mp4",
        "metrics_data": {"fps": 60.0, "latency": 20.0},
        "overlay_options": {"position": "top-left", "color": "red"}
    })
    assert response.status_code == 200
    assert response.json()['success'] is True


def test_render_metrics_overlay_invalid():
    response = client.post('/api/performance-metrics/render', json={
        "gameplay_video_url": "",
        "metrics_data": {"fps": 60.0, "latency": 20.0}
    })
    assert response.status_code == 422


def test_analyze_overlayed_video():
    response = client.get('/api/performance-metrics/analyze', params={
        "output_video_url": "https://example.com/overlayed_video.mp4"
    })
    assert response.status_code == 200
    assert 'analysis_report' in response.json()
    assert response.json()['analysis_report']['fps_analysis'] == 'Stable'


import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_user_profile():
    response = client.post('/user/profile/create', json={
        "user_id": "12345",
        "preferences": ["FPS", "RPG"],
        "skill_level": "intermediate"
    })
    assert response.status_code == 200
    assert response.json()['status'] == "success"

# Further test cases for update, get, delete and recommend APIs would go here.


import pytest
from fastapi.testclient import TestClient
from api.recording_management import router

client = TestClient(router)

def test_submit_feedback_success():
    response = client.post('/feedback/submit', json={
        "userId": "12345",
        "productId": "67890",
        "feedback": "Great product!",
        "rating": 5,
        "timestamp": "2025-01-27T09:19:27"
    })
    assert response.status_code == 200
    assert response.json() == {"status": "success", "message": "Feedback submitted successfully"}


def test_submit_feedback_invalid_rating():
    response = client.post('/feedback/submit', json={
        "userId": "12345",
        "productId": "67890",
        "feedback": "Great product!",
        "rating": 10,
        "timestamp": "2025-01-27T09:19:27"
    })
    assert response.status_code == 400
    assert "errors" in response.json()

import pytest
from fastapi.testclient import TestClient
from api.recording_management import router

client = TestClient(router)

def test_share_content_success():
    response = client.post("/share", json={
        'user_id': '12345',
        'gear_id': '67890',
        'platform': 'Facebook',
        'message': 'Check this out!'
    })
    assert response.status_code == 200
    assert response.json()['status'] == "success"

def test_share_content_missing_fields():
    response = client.post("/share", json={
        'user_id': '12345'
    })
    assert response.status_code == 400
    assert response.json()['detail'] == "Missing required fields