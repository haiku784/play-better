from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Define the database connection string
DATABASE_URL = 'sqlite:///example.db'  # Example using SQLite; change to your DB URL

# Create a new database engine instance
engine = create_engine(DATABASE_URL)

# Creating a configured "Session" class
Session = sessionmaker(bind=engine)

# Create a session object
session = Session()

# Function to close the session
def close_session():
    session.close()
# Usage: call close_session() when done.