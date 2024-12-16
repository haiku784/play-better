from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base

# Defining the base for SQLAlchemy models
Base = declarative_base()

class UserConfig(Base):
    __tablename__ = 'user_configs'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    config_data = Column(JSON)

    def __repr__(self):
        return f'<UserConfig(username={self.username}, config_data={self.config_data})>'

# This model represents the user configuration data in the database.