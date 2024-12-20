import sqlite3
from typing import List, Dict, Any

class UserGameplayData:
    def __init__(self, db_path: str):
        """Initialize the database connection."""
        self.connection = sqlite3.connect(db_path)
        self.cursor = self.connection.cursor()

    def retrieve_user_data(self, user_id: int) -> List[Dict[str, Any]]:
        """Retrieve gameplay data for a specific user by user_id."""
        query = "SELECT * FROM gameplay_data WHERE user_id = ?"
        self.cursor.execute(query, (user_id,))
        columns = [column[0] for column in self.cursor.description]
        results = [dict(zip(columns, row)) for row in self.cursor.fetchall()]
        return results

    def close_connection(self):
        """Close the database connection."""
        self.connection.close()