import unittest
from logging_manager import LoggingManager
import os

class TestLoggingManager(unittest.TestCase):
    def setUp(self):
        self.logger = LoggingManager('test.log')

    def test_log_model_output(self):
        self.logger.log_model_output('Test output')
        with open('test.log', 'r') as f:
            logs = f.readlines()
            self.assertIn('Model Output: Test output', logs[-1])

    def tearDown(self):
        os.remove('test.log')
