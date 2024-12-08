import pandas as pd
import sqlite3

# Function to ingest gameplay data from a CSV file to SQLite database
def ingest_data(csv_file, db_file):
    # Load data from CSV file into a DataFrame
    df = pd.read_csv(csv_file)
    
    # Connect to SQLite database (it will be created if it doesn't exist)
    conn = sqlite3.connect(db_file)
    
    # Write the DataFrame to the database (table will be created if it doesn't exist)
    df.to_sql('gameplay_data', conn, if_exists='replace', index=False)
    
    # Commit and close the connection
    conn.commit()
    conn.close()
    
    print('Data ingestion complete. Data stored in', db_file)

# Example usage: ingest_data('path/to/gameplay_data.csv', 'path/to/local_database.db')
