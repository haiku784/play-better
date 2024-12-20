import unittest
from ai_integration import AIIntegration

class TestAIIntegration(unittest.TestCase):
    def setUp(self):
        self.ai_integration = AIIntegration("test_openai_key", "test_llama_model")

    def test_process_gameplay_data(self):
        sample_data = "Player scored 100 points in the last game."
        result = self.ai_integration.process_gameplay_data(sample_data)
        self.assertIsNotNone(result)
        self.assertIn("points", result)

if __name__ == '__main__':
    unittest.main()