from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Base class for model definitions
Base = declarative_base()

class GameplayRecording(Base):
    __tablename__ = 'gameplay_recordings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    player_name = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    duration = Column(Integer, nullable=False)

    def __repr__(self):
        return f"<GameplayRecording(player_name={self.player_name}, score={self.score}, duration={self.duration})>"

# Database connection
DATABASE_URL = "sqlite:///./gameplay_recordings.db"
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)