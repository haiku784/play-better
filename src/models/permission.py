from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .database_setup import Base

class Permission(Base):
    __tablename__ = 'permissions'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    roles = relationship('Role', secondary='role_permissions', back_populates='permissions')

    def __repr__(self):
        return f'<Permission {self.name}>'
