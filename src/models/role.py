from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .database_setup import Base

class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    users = relationship('User', back_populates='role')

    def __repr__(self):
        return f'<Role {self.name}>'
