import unittest
from data_processing import load_data, clean_data

class TestDataProcessing(unittest.TestCase):

    def test_load_data(self):
        data = load_data('test_file.csv')  # Assume a test CSV file
        self.assertIsNotNone(data)

    def test_clean_data(self):
        input_data = pd.DataFrame({'A': [1, 2, None], 'B': [None, 2, 3]})
        cleaned_data = clean_data(input_data)
        self.assertEqual(cleaned_data.shape[0], 1)  # Should drop rows with NA

if __name__ == '__main__':
    unittest.main()