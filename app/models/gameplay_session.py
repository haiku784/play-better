from sqlalchemy import Column, Integer, String, LargeBinary, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class GameplaySession(Base):
    __tablename__ = 'gameplay_sessions'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    session_data = Column(LargeBinary, nullable=False)  # Encrypted data
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<GameplaySession(id={self.id}, user_id={self.user_id})>'
