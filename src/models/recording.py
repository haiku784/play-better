from pydantic import BaseModel

class Recording(BaseModel):
    user_id: int
    recording_id: str
    start_time: str  # ISO 8601 format
    end_time: str    # ISO 8601 format
    metadata: dict    # Additional data as a dictionary
