from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task(1)
    def index(self):
        self.client.get('/')  # Simulate a GET request to the homepage

    @task(2)
    def about(self):
        self.client.get('/about/')  # Simulate a GET request to the about page

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)  # Simulate wait time between tasks

# Command to run the test: locust -f load_test.py --host=http://yourwebsite.com
