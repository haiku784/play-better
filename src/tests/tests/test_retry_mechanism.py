import unittest
from unittest.mock import patch, Mock
from retry_mechanism import APIRetry

class TestAPIRetry(unittest.TestCase):
    @patch('retry_mechanism.requests.get')
    def test_retry_success(self, mock_get):
        """Test that the retry mechanism succeeds after a failure."""
        mock_get.side_effect = [Mock(status_code=500), Mock(status_code=200)]  # First fails, then succeeds
        retry_mechanism = APIRetry(max_attempts=2)
        response = retry_mechanism.retry(lambda: mock_get('https://api.example.com/data'))
        self.assertEqual(response.status_code, 200)

    @patch('retry_mechanism.requests.get')
    def test_retry_failure(self, mock_get):
        """Test that the retry mechanism raises an exception after all attempts fail."""
        mock_get.side_effect = Mock(status_code=500)  # Always fails
        retry_mechanism = APIRetry(max_attempts=2)
        with self.assertRaises(Exception):
            retry_mechanism.retry(lambda: mock_get('https://api.example.com/data'))

if __name__ == '__main__':
    unittest.main()