import pandas as pd

# Function to ingest data from a CSV file
# Parameters:
# - file_path: str, path to the CSV file
# Returns:
# - DataFrame: Pandas DataFrame containing the ingested data

def ingest_data(file_path):
    """
    Ingest data from a CSV file and return as a DataFrame.
    """
    try:
        data = pd.read_csv(file_path)
        return data
    except Exception as e:
        print(f"Error ingesting data: {e}")
        return None
