import unittest
from services.gameplay_recording.video_conversion_module import VideoConversionModule

class TestVideoConversionModule(unittest.TestCase):
    def setUp(self):
        self.video_conversion_module = VideoConversionModule()

    def test_convert_video_success(self):
        result = self.video_conversion_module.convert_video(b'video data', 'MP4')
        self.assertIsNotNone(result['convertedVideoData'])
        self.assertIsNone(result['errorMessage'])

    def test_convert_video_fail(self):
        result = self.video_conversion_module.convert_video(b'video data', 'INVALID_FORMAT')
        self.assertIsNone(result['convertedVideoData'])
        self.assertIsNotNone(result['errorMessage'])

if __name__ == '__main__':
    unittest.main()