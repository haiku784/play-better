import unittest
from performance_report_generator import PerformanceReportGenerator

class TestPerformanceReportGenerator(unittest.TestCase):
    def setUp(self):
        self.report_generator = PerformanceReportGenerator()

    def test_fetch_analysis_data(self):
        openai_analysis, llama_analysis = self.report_generator.fetch_analysis_data()
        self.assertIsNotNone(openai_analysis)
        self.assertIsNotNone(llama_analysis)

    def test_compile_report(self):
        openai_analysis = {'metric1': 0.9}
        llama_analysis = {'metric2': 0.8}
        report = self.report_generator.compile_report(openai_analysis, llama_analysis)
        self.assertIn('OpenAI_Analysis', report)
        self.assertIn('Llama_Analysis', report)
        self.assertIn('Recommendations', report)

    def test_generate_recommendations(self):
        openai_analysis = {'metric1': 0.9}
        llama_analysis = {'metric2': 0.8}
        recommendations = self.report_generator.generate_recommendations(openai_analysis, llama_analysis)
        self.assertGreater(len(recommendations), 0)

    def test_save_report(self):
        report = {'OpenAI_Analysis': {}, 'Llama_Analysis': {}, 'Recommendations': []}
        self.report_generator.save_report(report, 'test_report.json')
        with open('test_report.json', 'r') as f:
            saved_report = json.load(f)
        self.assertEqual(report, saved_report)

if __name__ == '__main__':
    unittest.main()