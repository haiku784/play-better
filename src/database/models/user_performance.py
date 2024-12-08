# Import necessary libraries
from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create a base class for declarative models
Base = declarative_base()

class UserPerformance(Base):
    __tablename__ = 'user_performance'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    score = Column(Float, nullable=False)
    timestamp = Column(String, nullable=False)

    def __repr__(self):
        return f'<UserPerformance(user_id={self.user_id}, score={self.score}, timestamp={self.timestamp})>'

# Function to create the database schema
def create_database(engine):
    Base.metadata.create_all(engine)

# Database connection settings
DATABASE_URL = 'postgresql://user:password@localhost/dbname'
engine = create_engine(DATABASE_URL)
create_database(engine)

# Creating a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)