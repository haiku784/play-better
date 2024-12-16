from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the base class using SQLAlchemy's declarative base
Base = declarative_base()

class GameplayMetrics(Base):
    __tablename__ = 'gameplay_metrics'
    # Define columns for the gameplay metrics table
    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(String, index=True)
    score = Column(Float)
    level_reached = Column(Integer)
    time_played = Column(Float)  # in seconds
    timestamp = Column(String)  # ISO format timestamp

    def __repr__(self):
        return f'<GameplayMetrics(id={self.id}, player_id={self.player_id}, score={self.score}, level_reached={self.level_reached})>'

# Configuration for the SQLite database (for simplicity)
database_url = "sqlite:///./gameplay_metrics.db"
engine = create_engine(database_url)

# Create all tables in the database
def create_database():
    Base.metadata.create_all(bind=engine)

# Create a new session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Function to get a new session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()