import logging

# Configure the logging settings
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('performance_test_results.log'),
        logging.StreamHandler()
    ]
)

# Function to log performance test results

def log_performance_test(endpoint_name, response_time, success, notes=''):
    """Logs the results of a performance test for an endpoint.
    
    Args:
        endpoint_name (str): The name of the endpoint tested.
        response_time (float): The time taken to respond in seconds.
        success (bool): Whether the test was successful or not.
        notes (str): Additional notes about the test.
    """
    if success:
        logging.info(f"Performance Test Success: {endpoint_name} responded in {response_time:.2f} seconds.")
    else:
        logging.error(f"Performance Test Failed: {endpoint_name} responded in {response_time:.2f} seconds. {notes}")

# Example usage of the logging function
if __name__ == '__main__':
    log_performance_test('/api/v1/resource', 0.85, True)
    log_performance_test('/api/v1/resource', 1.5, False, 'Timeout error.')