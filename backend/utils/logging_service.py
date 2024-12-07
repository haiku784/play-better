import logging

# Configure logging settings
logging.basicConfig(
    filename='app.log',
    filemode='a',
    format='%(asctime)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

def log_error(message):
    logging.error(message)

def log_info(message):
    logging.info(message)

if __name__ == '__main__':
    log_info('Logging service started.');