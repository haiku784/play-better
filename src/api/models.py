from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from src.api.database import Base

class UserRecommendation(Base):
    __tablename__ = 'user_recommendations'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    recommendation = Column(String)
    user = relationship("User", back_populates="recommendations")

    def __repr__(self):
        return f"<UserRecommendation id={self.id} user_id={self.user_id} recommendation='{self.recommendation}'>