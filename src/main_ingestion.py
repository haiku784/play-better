from src.data_ingestion.data_ingestion import ingest_data
from src.utils.db_connection import create_connection
from src.data_cleaning.data_cleaning import clean_data
import pandas as pd

if __name__ == '__main__':
    # Specify the paths to the CSV file and the SQLite database
    csv_file = 'path/to/gameplay_data.csv'
    db_file = 'path/to/local_database.db'
    
    # Create a database connection
    conn = create_connection(db_file)
    df = pd.read_csv(csv_file)
    cleaned_df = clean_data(df)
    
    # Ingest cleaned data into the database
    ingest_data(cleaned_df, db_file)
