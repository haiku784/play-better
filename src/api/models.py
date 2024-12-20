from sqlalchemy import Column, Integer, String
from database import Base

class GameplayMetrics(Base):
    __tablename__ = 'gameplay_metrics'

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(String, index=True)
    score = Column(Integer)
    level = Column(Integer)