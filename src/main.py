from sqlalchemy import create_engine
from .database_connection import close_session
from .user_crud import create_user, get_all_users, update_user, delete_user

# Main function to execute CRUD operations
if __name__ == '__main__':
    engine = create_engine('sqlite:///example.db')  # Change as needed
    create_user('John Doe', 'john@example.com')  # Create
    users = get_all_users()  # Read
    print(users)
    update_user(1, email='john.doe@example.com')  # Update
    delete_user(1)  # Delete
    close_session()  # Close the session after completion