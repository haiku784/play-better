from sqlalchemy import Column, Integer, String, Float
from database import Base

class GameplaySession(Base):
    __tablename__ = 'gameplay_sessions'

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, index=True)
    score = Column(Float)
    duration = Column(Float)
    created_at = Column(String)

    def __repr__(self):
        return f'<GameplaySession(player_id={self.player_id}, score={self.score}, duration={self.duration})>'
