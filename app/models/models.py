from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base  # Assuming there is a database file that initializes the SQLAlchemy session

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    recordings = relationship('Recording', back_populates='user')

class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    recordings = relationship('Recording', back_populates='game')

class Recording(Base):
    __tablename__ = 'recordings'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    game_id = Column(Integer, ForeignKey('games.id'))
    score = Column(Integer)
    timestamp = Column(String)

    user = relationship('User', back_populates='recordings')
    game = relationship('Game', back_populates='recordings')
