# Module for testing the scalability of the microservice

import requests
import time

class ScalabilityTester:
    def __init__(self, url):
        self.url = url

    def send_requests(self, num_requests):
        """Send a specified number of requests to the microservice."""
        start_time = time.time()
        for i in range(num_requests):
            response = requests.get(self.url)
            print(f"Request {i + 1}: {response.json()}")
        end_time = time.time()
        print(f"Time taken for {num_requests} requests: {end_time - start_time} seconds")

# Example usage
if __name__ == "__main__":
    tester = ScalabilityTester("http://localhost:8000/api/v1/healthcheck")
    tester.send_requests(100)  # Test sending 100 requests