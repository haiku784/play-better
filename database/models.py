# Place any necessary database-related functionality here
# This script will mainly hold reusable functions or classes

from sqlalchemy.orm import Session
from models.system_capabilities import SystemCapabilities

def create_capability(db: Session, cpu_model: str, cpu_cores: int, gpu_model: str, memory_size_gb: float, storage_size_gb: float):
    new_capability = SystemCapabilities(
        cpu_model=cpu_model,
        cpu_cores=cpu_cores,
        gpu_model=gpu_model,
        memory_size_gb=memory_size_gb,
        storage_size_gb=storage_size_gb
    )
    db.add(new_capability)
    db.commit()
    db.refresh(new_capability)
    return new_capability

# Add more functions as appropriate for handling CRUD operations