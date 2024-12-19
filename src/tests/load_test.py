import requests
import time

def load_test(url, num_requests):
    for _ in range(num_requests):
        response = requests.get(url)
        print(f'Status Code: {response.status_code}')
        time.sleep(1)  # Delay between requests

if __name__ == '__main__':
    load_test('http://localhost:8000/your-endpoint', 100)  # Change the URL to your endpoint
