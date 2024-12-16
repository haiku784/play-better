import requests
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, filename='health_check.log',
                    format='%(asctime)s - %(levelname)s - %(message)s')

# List of services to monitor
services = [
    'http://service1:8080/health',
    'http://service2:8080/health',
    'http://service3:8080/health'
]

def check_service_health(service_url):
    try:
        response = requests.get(service_url)
        if response.status_code == 200:
            logging.info(f'{service_url} is healthy')
        else:
            logging.warning(f'{service_url} returned status code: {response.status_code}')
    except requests.exceptions.RequestException as e:
        logging.error(f'Error connecting to {service_url}: {e}')

# Run health checks
for service in services:
    check_service_health(service)
