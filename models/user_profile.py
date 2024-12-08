from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import UniqueConstraint

Base = declarative_base()

class UserProfile(Base):
    __tablename__ = 'user_profiles'
    __table_args__ = (UniqueConstraint('email', name='uq_user_email'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    def __repr__(self):
        return f'<UserProfile(username={self.username}, email={self.email})>'

    @staticmethod
    def validate_email(email):
        import re
        regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
        return re.match(regex, email) is not None
