import requests

# Simple health check for backend service
def health_check():
    try:
        response = requests.get('http://localhost:5000/health')
        return response.status_code == 200
    except Exception as e:
        print(f'Health check failed: {e}')
        return False

if __name__ == '__main__':
    if health_check():
        print('Backend service is healthy')
    else:
        print('Backend service is down')