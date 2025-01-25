import unittest
from app.modules.event_detection import EventDetectionModule

class TestEventDetectionModule(unittest.TestCase):
    def setUp(self):
        self.module = EventDetectionModule()
        self.test_data = {
            'events': [
                {'type': 'goal', 'timestamp': 10, 'importance': 7},
                {'type': 'foul', 'timestamp': 25, 'importance': 3},
                {'type': 'goal', 'timestamp': 50, 'importance': 5},
            ]
        }

    def test_detect_events(self):
        detected = self.module.detect_events(self.test_data, ['goal'], None)
        self.assertEqual(len(detected), 2)  # should find 2 goals

    def test_filter_events(self):
        detected = self.module.detect_events(self.test_data, ['goal'], None)
        highlighted = self.module.filter_events(detected, importance_threshold=6)
        self.assertEqual(len(highlighted), 1)  # only one goal meets the threshold

if __name__ == '__main__':
    unittest.main()