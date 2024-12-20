import requests
import time

class ScalabilityTester:
    def __init__(self, url, total_requests):
        self.url = url
        self.total_requests = total_requests

    def run_test(self):
        start_time = time.time()
        for _ in range(self.total_requests):
            requests.get(self.url)

        total_time = time.time() - start_time
        print(f"Total Requests: {self.total_requests}")
        print(f"Total Time: {total_time:.2f} seconds")
        print(f"Average Time per Request: {total_time / self.total_requests:.4f} seconds")

if __name__ == '__main__':
    tester = ScalabilityTester(url='http://localhost:8000/video-upload', total_requests=10000)
    tester.run_test()