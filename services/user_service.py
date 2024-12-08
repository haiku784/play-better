from database.db_connection import Database

# Function to delete user by username

def delete_user(username):
    db = Database('users.db')
    db.cursor.execute('DELETE FROM users WHERE username = ?', (username,))
    db.connection.commit()
    db.close()
    return True
