import requests
import threading
import time

# Function to simulate user requests
def make_request(url, session):
    try:
        response = session.post(url, json={'user_id': 'test_user'})
        print(f'Response: {response.status_code}')
    except Exception as e:
        print(f'Error: {e}')

def stress_test(url, num_requests):
    with requests.Session() as session:
        threads = []
        for _ in range(num_requests):
            thread = threading.Thread(target=make_request, args=(url, session))
            threads.append(thread)
            thread.start()
            time.sleep(0.1)  # Slight delay to avoid overwhelming the server
        for thread in threads:
            thread.join()

if __name__ == '__main__':
    target_url = 'http://localhost:5000/user/request'
    concurrent_users = 500
    stress_test(target_url, concurrent_users)