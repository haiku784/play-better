from retry_mechanism import APIRetry
import requests

# Example API call function
def fetch_data_from_api():
    response = requests.get('https://api.example.com/data')
    return response

# Usage of the retry mechanism
retry_mechanism = APIRetry(max_attempts=5, backoff_factor=1)  # 5 attempts with 1 second backoff

try:
    result = retry_mechanism.retry(fetch_data_from_api)
    print('Data fetched successfully:', result.json())
except Exception as e:
    print(f'Failed to fetch data: {e}')