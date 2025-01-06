import unittest
from database import Database
from performance_metrics_controller import PerformanceMetricsController

class TestPerformanceMetricsController(unittest.TestCase):
    """
    Unit tests for the PerformanceMetricsController.
    """
    def setUp(self):
        self.db = Database(':memory:')  # Use an in-memory database for testing
        self.controller = PerformanceMetricsController(self.db)
        self.db.execute_query('''CREATE TABLE performance_metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            frame_rate INTEGER,
            resolution TEXT,
            processing_time REAL
        );''')

    def test_add_and_get_metric(self):
        self.controller.add_metric('session_1', 30, '1920x1080', 1.25)
        metrics = self.controller.get_metrics('session_1')
        self.assertEqual(len(metrics), 1)
        self.assertEqual(metrics[0][1], 'session_1')  # Verify session ID

    def test_remove_metrics(self):
        self.controller.add_metric('session_2', 60, '1280x720', 1.75)
        self.controller.remove_metrics('session_2')
        metrics = self.controller.get_metrics('session_2')
        self.assertEqual(len(metrics), 0)

    def tearDown(self):
        self.db.close()

if __name__ == '__main__':
    unittest.main()