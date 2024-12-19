import unittest
from unittest.mock import patch, MagicMock
from llama_api_client import LlamaAPIClient

class TestLlamaAPIClient(unittest.TestCase):
    @patch('requests.post')
    def test_get_performance_recommendations_success(self, mock_post):
        # Setup mock response
        mock_post.return_value = MagicMock(status_code=200, json=lambda: {'recommendations': []})
        client = LlamaAPIClient('http://test-url.com', 'test_api_key')
        response = client.get_performance_recommendations({'user_id': 123})
        expected_response = {'recommendations': []}

        self.assertEqual(response, expected_response)

    @patch('requests.post')
    def test_get_performance_recommendations_failure(self, mock_post):
        # Setup mock response for failure
        mock_post.return_value = MagicMock(status_code=400, text='Bad Request')
        client = LlamaAPIClient('http://test-url.com', 'test_api_key')
        with self.assertRaises(Exception) as context:
            client.get_performance_recommendations({'user_id': 123})
        self.assertTrue('Error fetching recommendations' in str(context.exception))