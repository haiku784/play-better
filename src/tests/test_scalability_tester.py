import unittest
from scalability_tester import ScalabilityTester

class TestScalabilityTester(unittest.TestCase):
    def test_run_tests(self):
        tester = ScalabilityTester(url="http://localhost:8000/health", request_count=10)
        response_times = tester.run_tests()
        self.assertEqual(len(response_times), 10)
        self.assertTrue(all(isinstance(rt, float) for rt in response_times))

if __name__ == '__main__':
    unittest.main()