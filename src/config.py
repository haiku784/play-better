import os

# Configuration for recording storage path
RECORDING_STORAGE_PATH = os.getenv("RECORDING_STORAGE_PATH", "/default/path/to/recordings")  # default path

# Ensure the directory exists
if not os.path.exists(RECORDING_STORAGE_PATH):
    os.makedirs(RECORDING_STORAGE_PATH)