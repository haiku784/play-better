import unittest
from gameplay_data_parser import GameplayDataParser

class TestGameplayDataParser(unittest.TestCase):
    def setUp(self):
        """ Sets up test data for the parser. """ 
        self.parser = GameplayDataParser()
        self.raw_data = json.dumps({
            "players": [{"name": "Player1", "performance_score": 85}]
        })

    def test_parse_gameplay_data(self):
        """ Tests the parsing of gameplay data. """ 
        parsed_data = self.parser.parse_gameplay_data(self.raw_data)
        self.assertIn('players', parsed_data)
        self.assertEqual(len(parsed_data['players']), 1)

if __name__ == '__main__':
    unittest.main()