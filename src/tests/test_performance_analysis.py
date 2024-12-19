import pytest
from src.api.performance_analysis import PerformanceAnalysis

class TestPerformanceAnalysis:
    def setup_method(self):
        # Initialize the PerformanceAnalysis object before each test
        self.performance_analysis = PerformanceAnalysis()

    def test_performance_analysis_basic_functionality(self):
        # Test basic functionality with sample data
        input_data = [1, 2, 3, 4, 5]
        result = self.performance_analysis.analyze(input_data)
        expected_output = {'average': 3.0, 'max': 5, 'min': 1}
        assert result == expected_output, "Should return correct performance metrics"

    def test_performance_analysis_empty_input(self):
        # Test with empty input
        input_data = []
        result = self.performance_analysis.analyze(input_data)
        expected_output = {'average': None, 'max': None, 'min': None}
        assert result == expected_output, "Should handle empty input gracefully"

    def test_performance_analysis_single_element(self):
        # Test with a single element
        input_data = [42]
        result = self.performance_analysis.analyze(input_data)
        expected_output = {'average': 42.0, 'max': 42, 'min': 42}
        assert result == expected_output, "Should return same value for single element"

    def test_performance_analysis_negative_numbers(self):
        # Test with negative numbers
        input_data = [-5, -10, -3, -1]
        result = self.performance_analysis.analyze(input_data)
        expected_output = {'average': -4.75, 'max': -1, 'min': -10}
        assert result == expected_output, "Should handle negative numbers correctly"

    def test_performance_analysis_large_numbers(self):
        # Test with large numbers
        input_data = [1000000, 2000000, 3000000]
        result = self.performance_analysis.analyze(input_data)
        expected_output = {'average': 2000000.0, 'max': 3000000, 'min': 1000000}
        assert result == expected_output, "Should handle large numbers correctly"

    @pytest.mark.parametrize("input_data, expected_output", [
        ([1, 2, 3, 4], {'average': 2.5, 'max': 4, 'min': 1}),
        ([10, 20, 30, 40], {'average': 25.0, 'max': 40, 'min': 10}),
        ([0, 0, 0], {'average': 0.0, 'max': 0, 'min': 0}),
    ])
    def test_performance_analysis_parametrized(self, input_data, expected_output):
        # Test using parameterized inputs
        result = self.performance_analysis.analyze(input_data)
        assert result == expected_output, "Should return correct metrics for parameterized input"
