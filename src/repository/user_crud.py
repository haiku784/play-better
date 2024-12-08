from sqlalchemy.orm import sessionmaker
from .database_connection import session
from .user_model import User

# Function to create a new user
def create_user(name, email):
    new_user = User(name=name, email=email)
    session.add(new_user)
    session.commit()
    return new_user

# Function to read all users
def get_all_users():
    return session.query(User).all()

# Function to update a user by ID
def update_user(user_id, name=None, email=None):
    user = session.query(User).filter_by(id=user_id).first()
    if user:
        if name:
            user.name = name
        if email:
            user.email = email
        session.commit()
    return user

# Function to delete a user by ID
def delete_user(user_id):
    user = session.query(User).filter_by(id=user_id).first()
    if user:
        session.delete(user)
        session.commit()
# Usage: call these functions as needed.