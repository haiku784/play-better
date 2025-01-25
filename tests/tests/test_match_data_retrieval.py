import unittest
from modules.match_data_retrieval import MatchDataRetrieval

class TestMatchDataRetrieval(unittest.TestCase):
    def test_get_match_data_success(self):
        result = MatchDataRetrieval.get_match_data('valid_match_id')
        self.assertIn('matchData', result)

    def test_get_match_data_not_found(self):
        with self.assertRaises(Exception):
            MatchDataRetrieval.get_match_data('invalid_match_id')

if __name__ == '__main__':
    unittest.main()