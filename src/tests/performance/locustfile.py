from locust import HttpUser, task, between

class FastAPIUser(HttpUser):
    wait_time = between(1, 2)  # Wait time between tasks in seconds

    @task(1)
    def load_test_endpoint(self):
        self.client.get('/api/endpoint')  # Replace with your actual endpoint to be tested
