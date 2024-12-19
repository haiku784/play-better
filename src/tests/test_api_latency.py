import unittest
from api.llama_api_client import LlamaAPI
from api.openai_api_client import OpenAIAPI

class TestAPILatency(unittest.TestCase):
    def test_llama_api_latency(self):
        llama_api = LlamaAPI()
        response = llama_api.fetch_data('data-endpoint')
        self.assertIsNotNone(response)  # Ensure the response is not None

    def test_openai_api_latency(self):
        openai_api = OpenAIAPI()
        response = openai_api.fetch_response('Hello, how are you?')
        self.assertIsNotNone(response)  # Ensure the response is not None

if __name__ == '__main__':
    unittest.main()