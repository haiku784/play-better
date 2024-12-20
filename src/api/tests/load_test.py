import time
import requests

def load_test_performance_metrics(url, num_requests):
    """Simulates load testing by sending multiple requests to the performance metrics API."""
    start_time = time.time()
    for _ in range(num_requests):
        response = requests.post(url, json={'metric_name': 'CPU Load', 'value': 50.0, 'timestamp': '2023-10-01T12:00:00Z'})
        print(f'Response status: {response.status_code}')
    duration = time.time() - start_time
    print(f'Total time for {num_requests} requests: {duration} seconds')