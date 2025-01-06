import logging

# Configure the logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Function to log performance metrics
def log_performance_metrics(test_name, duration, record_count):
    logging.info(f"Test: {test_name}, Duration: {duration:.2f} seconds, Records: {record_count}")

# Example usage during performance test
# log_performance_metrics("Insert 10 million records", insert_duration, 10000000)