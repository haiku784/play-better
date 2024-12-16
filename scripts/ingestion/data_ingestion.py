import requests
import json
import logging

# Configure logging settings
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class GameplayDataIngestion:
    def __init__(self, source_url):
        self.source_url = source_url

    def fetch_data(self):
        """
        Fetches gameplay data from the specified source URL.
        """
        try:
            logging.info(f"Fetching data from {self.source_url}")
            response = requests.get(self.source_url)
            response.raise_for_status()  # Raises an error for bad responses
            data = response.json()  # Parses the response JSON
            logging.info(f"Data fetched successfully: {data}")
            return data
        except requests.exceptions.HTTPError as http_err:
            logging.error(f'HTTP error occurred: {http_err}')
        except Exception as err:
            logging.error(f'An error occurred: {err}')
        return None

if __name__ == '__main__':
    # Example usage
    data_source = 'https://api.example.com/gameplay-data'
    ingestion = GameplayDataIngestion(data_source)
    gameplay_data = ingestion.fetch_data()
    if gameplay_data:
        # Process the gameplay data as required
        pass  # Placeholder for data processing logic