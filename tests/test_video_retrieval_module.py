import unittest
from unittest.mock import Mock
from services.gameplay_recording.video_retrieval_module import VideoRetrievalModule

class TestVideoRetrievalModule(unittest.TestCase):
    def setUp(self):
        self.storage_service_mock = Mock()
        self.video_module = VideoRetrievalModule(self.storage_service_mock)

    def test_retrieve_video_success(self):
        self.storage_service_mock.get_video.return_value = b'video data'
        result = self.video_module.retrieve_video('video_id', 'user_id')
        self.assertIsNotNone(result['videoData'])
        self.assertIsNone(result['errorMessage'])

    def test_retrieve_video_not_found(self):
        self.storage_service_mock.get_video.return_value = None
        result = self.video_module.retrieve_video('video_id', 'user_id')
        self.assertIsNone(result['videoData'])
        self.assertIsNotNone(result['errorMessage'])

if __name__ == '__main__':
    unittest.main()