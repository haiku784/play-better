import requests
from concurrent.futures import ThreadPoolExecutor
from time import time

class LoadTester:
    def __init__(self, url, total_requests, concurrent_users):
        self.url = url
        self.total_requests = total_requests
        self.concurrent_users = concurrent_users
        self.response_times = []

    def send_request(self):
        start = time()
        response = requests.get(self.url)
        elapsed = time() - start
        self.response_times.append(elapsed)  # Store the response time
        return response.status_code

    def run_test(self):
        with ThreadPoolExecutor(max_workers=self.concurrent_users) as executor:
            futures = [executor.submit(self.send_request) for _ in range(self.total_requests)]
            for future in futures:
                future.result()  # Wait for all requests to complete

    def report(self):
        total_time = sum(self.response_times)
        avg_time = total_time / len(self.response_times) if self.response_times else 0
        print(f"Total Requests: {self.total_requests}")
        print(f"Average Response Time: {avg_time:.2f} seconds")
        print(f"Max Response Time: {max(self.response_times):.2f} seconds")
        print(f"Min Response Time: {min(self.response_times):.2f} seconds")

if __name__ == '__main__':
    tester = LoadTester(url='http://localhost:8000/video-upload', total_requests=10000, concurrent_users=100)
    tester.run_test()
    tester.report()