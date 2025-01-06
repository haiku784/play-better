import sqlite3

class Database:
    """
    A class to manage the database connection and operations.
    """
    def __init__(self, db_file):
        """
        Initialize the database connection.
        """
        self.connection = sqlite3.connect(db_file)
        self.cursor = self.connection.cursor()

    def close(self):
        """
        Close the database connection.
        """
        self.connection.close()

    def execute_query(self, query, params=None):
        """
        Execute a single query with optional parameters.
        """
        if params:
            self.cursor.execute(query, params)
        else:
            self.cursor.execute(query)
        self.connection.commit()

    def fetch_all(self):
        """
        Fetch all results from the last executed query.
        """
        return self.cursor.fetchall()
    
    def fetch_one(self):
        """
        Fetch one result from the last executed query.
        """
        return self.cursor.fetchone()