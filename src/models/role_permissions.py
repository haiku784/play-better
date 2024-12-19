from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .database_setup import Base

class RolePermissions(Base):
    __tablename__ = 'role_permissions'

    role_id = Column(Integer, ForeignKey('roles.id'), primary_key=True)
    permission_id = Column(Integer, ForeignKey('permissions.id'), primary_key=True)

    role = relationship('Role', back_populates='permissions')
    permission = relationship('Permission', back_populates='roles')

    def __repr__(self):
        return f'<RolePermissions role_id={self.role_id}, permission_id={self.permission_id}>'
