import requests

# Define the health check function
def health_check(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f'Health Check Passed: {url} is UP')
        else:
            print(f'Health Check Failed: {url} returned {response.status_code}')
    except requests.exceptions.RequestException as e:
        print(f'Health Check Failed: {url} with error {e}')

if __name__ == '__main__':
    health_check('http://<your_service_ip>/health')