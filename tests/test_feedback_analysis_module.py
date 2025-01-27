import unittest
from api.feedback_analysis_module import FeedbackAnalysisModule

class TestFeedbackAnalysisModule(unittest.TestCase):
    def setUp(self):
        self.module = FeedbackAnalysisModule()

    def test_analyze_feedback(self):
        feedback_text = "I love the new features!"
        user_id = "user123"
        result = self.module.analyze_feedback(feedback_text, user_id)
        self.assertIn('sentiment', result)
        self.assertIn('keyTopics', result)
        self.assertEqual(result['sentiment'], 'pos')

if __name__ == '__main__':
    unittest.main()