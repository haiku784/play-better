import logging

# Configure the logger
logging.basicConfig(filename='error.log', level=logging.ERROR)

def log_error(error_message):
    logging.error(error_message)
    print(f"Error logged: {error_message}")
