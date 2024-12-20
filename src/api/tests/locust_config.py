from locust import HttpLocust

class LoadTestConfig(HttpLocust):
    task_set = LoadTester
    min_wait = 1000  # Minimum wait time between tasks in milliseconds
    max_wait = 2000  # Maximum wait time between tasks in milliseconds
