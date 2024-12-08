from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    performance = relationship('UserPerformance', back_populates='owner')

class UserPerformance(Base):
    __tablename__ = 'user_performance'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    score = Column(Integer)
    timestamp = Column(String)
    
    owner = relationship('User', back_populates='performance')
