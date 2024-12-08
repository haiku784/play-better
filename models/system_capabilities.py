from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

# Define the base class for SQLAlchemy models
Base = declarative_base()

class SystemCapabilities(Base):
    __tablename__ = 'system_capabilities'

    id = Column(Integer, primary_key=True)
    cpu_model = Column(String, nullable=False)
    cpu_cores = Column(Integer, nullable=False)
    gpu_model = Column(String, nullable=False)
    memory_size_gb = Column(Float, nullable=False)
    storage_size_gb = Column(Float, nullable=False)

    def __repr__(self):
        return f'<SystemCapabilities(id={self.id}, cpu_model={self.cpu_model}, cpu_cores={self.cpu_cores}, gpu_model={self.gpu_model}, memory_size_gb={self.memory_size_gb}, storage_size_gb={self.storage_size_gb})>'