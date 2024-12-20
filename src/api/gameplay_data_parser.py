import json

class GameplayDataParser:
    def parse_gameplay_data(self, raw_data: str) -> dict:
        """ Parses raw gameplay data from JSON string to structured dictionary. """ 
        return json.loads(raw_data)
