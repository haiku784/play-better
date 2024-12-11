import sqlite3
import logging
from typing import List, Tuple

# Configure logging to track errors and info
logging.basicConfig(level=logging.INFO)

class GameplayDataCollector:
    def __init__(self, db_file: str):
        """ Initializes the data collector with the given database file. """
        self.connection = self.connect_to_db(db_file)

    def connect_to_db(self, db_file: str):
        """ Connects to the SQLite database. """
        try:
            connection = sqlite3.connect(db_file)
            logging.info("Successfully connected to the database.")
            return connection
        except sqlite3.Error as e:
            logging.error(f"Database connection error: {e}")
            raise

    def fetch_user_play_data(self, user_id: int) -> List[Tuple]:
        """ Fetches gameplay data for a specific user by user_id. """ 
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM gameplay_data WHERE user_id = ?", (user_id,))
            data = cursor.fetchall()
            logging.info(f"Fetched {len(data)} records for user_id: {user_id}")
            return data
        except sqlite3.Error as e:
            logging.error(f"Error fetching data: {e}")
            raise

    def close_connection(self):
        """ Closes the database connection. """ 
        if self.connection:
            self.connection.close()
            logging.info("Database connection closed.")

# Example usage:
if __name__ == '__main__':
    collector = GameplayDataCollector('gameplay_metrics.db')
    user_data = collector.fetch_user_play_data(user_id=1)
    print(user_data)
    collector.close_connection()