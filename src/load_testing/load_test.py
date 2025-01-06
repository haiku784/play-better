import requests
import time

class LoadTester:
    def __init__(self, url, total_requests):
        self.url = url
        self.total_requests = total_requests

    def run_test(self):
        for i in range(self.total_requests):
            response = requests.get(self.url)
            print(f'Request {i + 1}: {response.status_code}')
            time.sleep(1)  # Waiting 1 second between requests

# Example usage:
# tester = LoadTester('http://localhost:80', 10)
# tester.run_test()