import logging
import os

# Configure logging
if not os.path.exists('logs'):
    os.makedirs('logs')
logging.basicConfig(level=logging.INFO, filename='logs/performance_metrics.log',
                    format='%(asctime)s - %(levelname)s - %(message)s')

def log_performance_metrics(success_count, failure_count, duration):
    """ Logs the performance metrics of the load test. """
    logging.info(f'Load Test Metrics: {success_count} successes, {failure_count} failures, Duration: {duration:.2f} seconds')