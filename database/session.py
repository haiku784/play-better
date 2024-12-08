# Import necessary modules
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# Database URL, you might change this according to your configuration
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./test.db')

# Create an engine
engine = create_engine(DATABASE_URL)

# Create a configured 'Session' class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()