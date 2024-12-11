import csv
import json
from typing import List, Dict

class GameplayDataIngestion:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.data = []  # List to hold the processed data

    def read_csv(self) -> List[Dict]:
        """Reads a CSV file and returns a list of dictionaries."""
        with open(self.file_path, mode='r', newline='', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                self.data.append(row)
        return self.data

    def read_json(self) -> List[Dict]:
        """Reads a JSON file and returns a list of dictionaries."""
        with open(self.file_path, 'r', encoding='utf-8') as file:
            self.data = json.load(file)
        return self.data

    def process_data(self) -> None:
        """Processes the data and stores it in a structured format."""
        # Example of processing: converting strings to appropriate data types
        for entry in self.data:
            entry['score'] = int(entry['score'])  # Converting score to integer
            entry['timestamp'] = float(entry['timestamp'])  # Converting timestamp to float

    def get_data(self) -> List[Dict]:
        """Returns the processed data."""
        return self.data

# Example usage:
# ingestion_module = GameplayDataIngestion('path/to/data.csv')
# data = ingestion_module.read_csv()
# ingestion_module.process_data()
# processed_data = ingestion_module.get_data()