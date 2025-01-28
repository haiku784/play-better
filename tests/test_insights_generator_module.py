import unittest
from api.insights_generator_module import InsightsGeneratorModule

class TestInsightsGeneratorModule(unittest.TestCase):
    def setUp(self):
        self.module = InsightsGeneratorModule()

    def test_generate_insights(self):
        feedback_analysis = {'sentiment': 'negative', 'keyTopics': ['pricing', 'support']}
        user_id = "user123"
        result = self.module.generate_insights(feedback_analysis, user_id)
        self.assertIn('insights', result)
        self.assertIn('followUpActions', result)
        self.assertGreater(len(result['insights']), 0)

if __name__ == '__main__':
    unittest.main()