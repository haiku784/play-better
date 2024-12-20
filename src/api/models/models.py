from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from src.api.database import Base

class UserRecommendation(Base):
    __tablename__ = 'user_recommendations'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    recommendation = Column(String, nullable=False)
    score = Column(Integer, nullable=False)

    user = relationship('User', back_populates='recommendations')

# Summary: This SQLAlchemy model represents user recommendations, with fields for id, user_id, recommendation text, and score. It establishes a relationship with the User model.