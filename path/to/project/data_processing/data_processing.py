import pandas as pd

# Load data from a CSV file
def load_data(file_path):
    """Load data from a given CSV file."""
    return pd.read_csv(file_path)

# Clean the data by removing NA values
def clean_data(data):
    """Clean the DataFrame by dropping rows with NA values."""
    return data.dropna()

# Main function to process data
def process_data(file_path):
    """Load and clean data using load_data and clean_data functions."""
    data = load_data(file_path)
    cleaned_data = clean_data(data)
    return cleaned_data
