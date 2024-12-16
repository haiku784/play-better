import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
def connect_db(db_name='user_configs.db'):
    return sqlite3.connect(db_name)

# Create the user configuration table

def create_user_config_table(conn):
    try:
        query = '''CREATE TABLE IF NOT EXISTS user_config (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    gameplay_style TEXT NOT NULL,
                    preferences TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );''' 
        conn.execute(query)
        conn.commit()
        print("User Config table created successfully.")
    except Exception as e:
        print(f"Error creating table: {e}")

# Insert user configuration into the table

def insert_user_config(conn, username, gameplay_style, preferences):
    try:
        query = '''INSERT INTO user_config (username, gameplay_style, preferences) 
                    VALUES (?, ?, ?);'''
        conn.execute(query, (username, gameplay_style, preferences))
        conn.commit()
        print("User config inserted successfully.")
    except Exception as e:
        print(f"Error inserting user config: {e}")

# Retrieve all user configurations

def retrieve_user_configs(conn):
    try:
        query = "SELECT * FROM user_config;"
        cursor = conn.execute(query)
        configs = cursor.fetchall()
        print("Retrieved user configs:")
        return configs
    except Exception as e:
        print(f"Error retrieving user configs: {e}")
        return []

# Main function to run the database operations

def main():
    conn = connect_db()
    create_user_config_table(conn)
    # Example of inserting a config
    insert_user_config(conn, 'player1', 'aggressive', '{"sound": "on", "difficulty": "medium"}')
    # Retrieve and print all configurations
    configs = retrieve_user_configs(conn)
    for config in configs:
        print(config)
    conn.close()

# Run the main function
if __name__ == '__main__':
    main()