import time
import random
import requests
from concurrent.futures import ThreadPoolExecutor

class LoadTester:
    def __init__(self, url):
        self.url = url

    def test_endpoint(self):
        """Make a request to the endpoint and return the response."""
        response = requests.get(self.url)
        return response.status_code

    def run_load_test(self, num_requests):
        """Run a load test by sending a number of requests concurrently."""
        print(f"Running load test with {num_requests} requests...")
        start_time = time.time()
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(self.test_endpoint) for _ in range(num_requests)]
            for future in futures:
                try:
                    print(f'Response Code: {future.result()}')
                except Exception as e:
                    print(f'Error occurred: {e}')
        end_time = time.time()
        print(f"Load test completed in {end_time - start_time:.2f} seconds.")