from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

# Base class for declarative class definitions
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'  # Name of the table in the database

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

# Function to create the table in the database
def create_tables(engine):
    Base.metadata.create_all(engine)
# Usage: call create_tables(engine) after creating the database engine.