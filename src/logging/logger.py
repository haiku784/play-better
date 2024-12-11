import logging

# Setting up basic configuration for logging
logging.basicConfig(
    level=logging.INFO,  # Set the logging level to INFO
    format='%(asctime)s - %(levelname)s - %(message)s',  # Format of the log messages
    filename='user_recordings.log',  # Log file name
    filemode='a'  # Append mode
)

# Function to log user recordings

def log_user_recording(user_id, recording_title):
    logging.info(f'User {user_id} recorded: {recording_title}')  # Log user recording action

# Function to log title management actions

def log_title_management(action, title):
    logging.info(f'Title management action: {action} on title: {title}')  # Log title management action

# Example usage
if __name__ == '__main__':
    log_user_recording(1, 'My First Recording')
    log_title_management('Created', 'My First Recording')