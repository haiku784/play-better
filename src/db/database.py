from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# Database connection string
DATABASE_URL = "sqlite:///./gameplay_recordings.db"

# Create database engine
engine = create_engine(DATABASE_URL)

# Session local class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database tables
Base.metadata.create_all(bind=engine)